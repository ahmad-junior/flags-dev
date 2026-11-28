// MediaRecorder WebM files have no duration, so players show a broken timeline. This adds it by rewriting only the small file header.

const ID = {
  EBML: 0x1a45dfa3,
  SEGMENT: 0x18538067,
  SEEK_HEAD: 0x114d9b74,
  CUES: 0x1c53bb6b,
  CLUSTER: 0x1f43b675,
  INFO: 0x1549a966,
  TIMECODE_SCALE: 0x2ad7b1,
  DURATION: 0x4489,
};

function readVint(bytes: Uint8Array, at: number, keepMarker: boolean) {
  const first = bytes[at];
  if (!first) return null;

  const length = Math.clz32(first) - 23;
  if (at + length > bytes.length) return null;

  const mask = 0xff >> length;
  let value = keepMarker ? first : first & mask;
  let unknown = (first & mask) === mask;

  for (let i = 1; i < length; i++) {
    value = value * 256 + bytes[at + i];
    unknown &&= bytes[at + i] === 0xff;
  }

  return { length, value, unknown };
}

function readElement(bytes: Uint8Array, start: number) {
  const id = readVint(bytes, start, true);
  if (!id) return null;
  const size = readVint(bytes, start + id.length, false);
  if (!size) return null;

  const data = start + id.length + size.length;
  return {
    id: id.value,
    start,
    data,
    size: size.value,
    end: data + size.value,
    unknown: size.unknown,
  };
}

export async function fixWebmDuration(blob: Blob, durationMs: number) {
  const head = new Uint8Array(await blob.slice(0, 64 * 1024).arrayBuffer());

  const ebml = readElement(head, 0);
  if (ebml?.id !== ID.EBML) return blob;

  const segment = readElement(head, ebml.end);
  if (segment?.id !== ID.SEGMENT || !segment.unknown) return blob;

  let info = readElement(head, segment.data);
  while (info && info.id !== ID.INFO) {
    if (
      info.unknown ||
      info.id === ID.SEEK_HEAD ||
      info.id === ID.CUES ||
      info.id === ID.CLUSTER
    ) {
      return blob;
    }
    info = readElement(head, info.end);
  }
  if (!info || info.unknown || info.end > head.length) return blob;

  let timecodeScale = 1_000_000;
  for (let at = info.data; at < info.end; ) {
    const child = readElement(head, at);
    if (!child || child.id === ID.DURATION) return blob;
    if (child.id === ID.TIMECODE_SCALE) {
      timecodeScale = head
        .subarray(child.data, child.end)
        .reduce((total, byte) => total * 256 + byte, 0);
    }
    at = child.end;
  }

  const duration = new Uint8Array(11);
  duration.set([0x44, 0x89, 0x88]);
  new DataView(duration.buffer).setFloat64(
    3,
    (durationMs * 1_000_000) / timecodeScale,
  );

  const header = new Uint8Array(12);
  header.set([0x15, 0x49, 0xa9, 0x66]);
  const view = new DataView(header.buffer);
  view.setBigUint64(4, BigInt(info.size + duration.length));
  header[4] = 0x01;

  return new Blob(
    [
      head.slice(0, info.start),
      header,
      head.slice(info.data, info.end),
      duration,
      blob.slice(info.end),
    ],
    { type: blob.type },
  );
}
