import { FLUSH_INTERVAL_MS } from "./constants";
import { SyncHandle, StorageRequest, StorageResponse } from "./types";

declare const FileReaderSync: new () => {
  readAsArrayBuffer(blob: Blob): ArrayBuffer;
};

let handle: SyncHandle | null = null;
let offset = 0;
let lastFlush = 0;
let broken = false;

const reply = (message: StorageResponse) => self.postMessage(message);

self.onmessage = async ({ data }: MessageEvent<StorageRequest>) => {
  try {
    if (data.type === "open") {
      const root = await navigator.storage.getDirectory();
      const directory = await root.getDirectoryHandle(data.directory, {
        create: true,
      });
      const file = await directory.getFileHandle(data.name, { create: true });
      handle = await (
        file as unknown as { createSyncAccessHandle(): Promise<SyncHandle> }
      ).createSyncAccessHandle();
      reply({ type: "opened" });
    } else if (data.type === "write") {
      // Synchronous from here on, so chunk order is always preserved
      if (!handle || broken) return;

      const buffer = new FileReaderSync().readAsArrayBuffer(data.chunk);
      const written = handle.write(buffer, { at: offset });

      if (written !== buffer.byteLength) {
        handle.truncate(offset); // drop the partial chunk
        throw new Error("Browser storage is full.");
      }

      offset += written;

      if (Date.now() - lastFlush > FLUSH_INTERVAL_MS) {
        handle.flush();
        lastFlush = Date.now();
      }

      reply({ type: "written", size: data.chunk.size, total: offset });
    } else {
      try {
        handle?.flush();
      } finally {
        handle?.close();
        handle = null;
      }
      reply({ type: "closed" });
    }
  } catch (error) {
    broken = true;
    reply({
      type: data.type === "write" ? "write-failed" : "failed",
      message: error instanceof Error ? error.message : "Storage failed.",
    });
  }
};
