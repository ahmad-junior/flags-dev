export class CancelledError extends Error {
  constructor() {
    super("Recording was cancelled.");
    this.name = "CancelledError";
  }
}

export function stopTracks(stream: MediaStream) {
  stream.getTracks().forEach((track) => track.stop());
}

/**
 * Owns every resource of one recording. Anything added after close()
 * is released immediately, so a late permission prompt can never leave
 * the camera or microphone running.
 */
export class Session {
  closed = false;
  private disposers: (() => void)[] = [];

  defer(dispose: () => void) {
    if (this.closed) dispose();
    else this.disposers.push(dispose);
  }

  assertOpen() {
    if (this.closed) throw new CancelledError();
  }

  addStream(stream: MediaStream) {
    this.defer(() => stopTracks(stream));
    this.assertOpen();
    return stream;
  }

  close() {
    if (this.closed) return;
    this.closed = true;

    while (this.disposers.length) {
      try {
        this.disposers.pop()?.();
      } catch (error) {
        console.warn("Recorder cleanup failed", error);
      }
    }
  }
}

/** No await in the engine is allowed to wait forever. */
export function withTimeout<T>(
  task: Promise<T>,
  ms: number,
  label: string,
  onLate?: (value: T) => void,
): Promise<T> {
  return new Promise((resolve, reject) => {
    let expired = false;
    const timer = setTimeout(() => {
      expired = true;
      reject(new Error(`${label} timed out.`));
    }, ms);

    task.then(
      (value) => {
        clearTimeout(timer);
        if (expired) onLate?.(value);
        else resolve(value);
      },
      (error) => {
        clearTimeout(timer);
        reject(error);
      },
    );
  });
}
