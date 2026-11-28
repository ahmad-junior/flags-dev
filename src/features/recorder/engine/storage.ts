import { withTimeout } from "./session";
import type { StorageRequest, StorageResponse } from "./types";
import { SinkEvents, RecordingSink, SavedRecording } from "./types";
import {
  DIRECTORY,
  LOCK_PREFIX,
  MAX_PENDING_BYTES,
  MAX_MEMORY_BYTES,
} from "./constants";

async function getDirectory() {
  const root = await navigator.storage.getDirectory();
  return root.getDirectoryHandle(DIRECTORY, { create: true });
}

function holdLock(name: string) {
  if (!navigator.locks) return () => {};

  let release = () => {};
  const held = new Promise<void>((resolve) => {
    release = resolve;
  });
  void navigator.locks.request(LOCK_PREFIX + name, () => held).catch(() => {});

  return release;
}

class DiskSink implements RecordingSink {
  readonly persistent = true;
  private pending = 0;
  private failed = false;
  private closing = false;
  private waiter: ((response: StorageResponse) => void) | null = null;
  private readonly unlock: () => void;

  private constructor(
    private readonly worker: Worker,
    private readonly name: string,
    private readonly mimeType: string,
    private readonly events: SinkEvents,
  ) {
    this.unlock = holdLock(name);

    worker.onmessage = ({ data }: MessageEvent<StorageResponse>) => {
      if (data.type === "written") {
        this.pending -= data.size;
        events.onBytes(data.total);
      } else if (data.type === "write-failed") {
        this.fail(data.message);
      } else {
        this.waiter?.(data);
      }
    };

    worker.onerror = () => {
      this.waiter?.({ type: "failed", message: "Storage worker crashed." });
      this.fail("Storage worker crashed.");
    };
  }

  static async open(name: string, mimeType: string, events: SinkEvents) {
    const worker = new Worker(new URL("./storage.worker.ts", import.meta.url), {
      type: "module",
    });
    const sink = new DiskSink(worker, name, mimeType, events);

    try {
      await sink.request(
        { type: "open", directory: DIRECTORY, name },
        "opened",
        10_000,
      );
      return sink;
    } catch (error) {
      await sink.remove();
      throw error;
    }
  }

  private fail(message: string) {
    if (this.failed) return;
    this.failed = true;
    this.events.onFull(message);
  }

  private send(message: StorageRequest) {
    this.worker.postMessage(message);
  }

  private request(
    message: StorageRequest,
    expected: StorageResponse["type"],
    timeout: number,
  ) {
    const response = new Promise<void>((resolve, reject) => {
      this.waiter = (data) => {
        this.waiter = null;
        if (data.type === expected) resolve();
        else
          reject(
            new Error(data.type === "failed" ? data.message : "Storage error."),
          );
      };
      this.send(message);
    });

    return withTimeout(response, timeout, "Storage");
  }

  write(chunk: Blob) {
    if (this.closing || this.failed) return;

    this.pending += chunk.size;
    this.send({ type: "write", chunk });

    if (this.pending > MAX_PENDING_BYTES) {
      this.events.onFull("Your disk is too slow for this quality.");
    }
  }

  async close() {
    this.closing = true;

    try {
      await this.request({ type: "close" }, "closed", 30_000);
    } catch (error) {
      console.warn("Storage did not close cleanly", error);
    } finally {
      this.worker.terminate();
    }

    const directory = await getDirectory();
    const file = await (await directory.getFileHandle(this.name)).getFile();

    return file.slice(0, file.size, this.mimeType);
  }

  release() {
    this.unlock();
  }

  async remove() {
    this.closing = true;
    this.worker.terminate();

    try {
      await deleteSavedRecording(this.name);
    } catch {
    } finally {
      this.unlock();
    }
  }
}

class MemorySink implements RecordingSink {
  readonly persistent = false;
  private parts: Blob[] = [];
  private size = 0;
  private full = false;

  constructor(
    private readonly mimeType: string,
    private readonly events: SinkEvents,
  ) {}

  write(chunk: Blob) {
    this.parts.push(chunk);
    this.size += chunk.size;
    this.events.onBytes(this.size);

    if (!this.full && this.size > MAX_MEMORY_BYTES) {
      this.full = true;
      this.events.onFull("The in-memory recording limit (1 GB) was reached.");
    }
  }

  async close() {
    return new Blob(this.parts, { type: this.mimeType });
  }

  release() {
    this.parts = [];
  }

  async remove() {
    this.release();
  }
}

export async function createSink(
  name: string,
  mimeType: string,
  events: SinkEvents,
): Promise<RecordingSink> {
  try {
    return await DiskSink.open(name, mimeType, events);
  } catch (error) {
    console.warn("Disk storage unavailable, using memory", error);
    return new MemorySink(mimeType, events);
  }
}

export async function getFreeSpace() {
  try {
    const { quota, usage = 0 } = await navigator.storage.estimate();
    return quota === undefined ? null : quota - usage;
  } catch {
    return null;
  }
}

export async function listSavedRecordings(): Promise<SavedRecording[]> {
  try {
    const directory = await getDirectory();
    const locks = await navigator.locks?.query();
    const inUse = new Set(locks?.held?.map((lock) => lock.name));
    const entries = (
      directory as unknown as {
        values(): AsyncIterable<FileSystemHandle>;
      }
    ).values();
    const saved: SavedRecording[] = [];

    for await (const entry of entries) {
      if (entry.kind !== "file" || inUse.has(LOCK_PREFIX + entry.name)) {
        continue;
      }

      try {
        const file = await (entry as FileSystemFileHandle).getFile();
        if (file.size > 0) {
          saved.push({
            name: entry.name,
            size: file.size,
            lastModified: file.lastModified,
          });
        }
      } catch {
        // Skip unreadable files
      }
    }

    return saved.sort((a, b) => b.lastModified - a.lastModified);
  } catch {
    return [];
  }
}

export async function readSavedRecording(name: string) {
  const directory = await getDirectory();
  return (await directory.getFileHandle(name)).getFile();
}

export async function deleteSavedRecording(name: string) {
  const directory = await getDirectory();
  await directory.removeEntry(name);
}
