// MediaRecorder WebM files have no duration, so players show a broken timeline. This adds it by rewriting only the small file header.
import { HEAD_BYTES, MAX_TAIL_BYTES } from "./constants";

const ID = {
  EBML: 0x1a45dfa3,
  SEGMENT: 0x18538067,
  SEEK_HEAD: 0x114d9b74,
  CUES: 0x1c53bb6b,
  CLUSTER: 0x1f43b675,
  INFO: 0x1549a966,
  TIMECODE_SCALE: 0x2ad7b1,
  DURATION: 0x4489,
  CLUSTER_TIME: 0xe7,
  BLOCK_GROUP: 0xa0,
  BLOCK: 0xa1,
  SIMPLE_BLOCK: 0xa3,
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

const readUint = (bytes: Uint8Array) =>
  bytes.reduce((total, byte) => total * 256 + byte, 0);

const readBytes = async (blob: Blob) =>
  new Uint8Array(await blob.arrayBuffer());

function parseHeader(head: Uint8Array) {
  const ebml = readElement(head, 0);
  if (ebml?.id !== ID.EBML) return null;

  const segment = readElement(head, ebml.end);
  if (segment?.id !== ID.SEGMENT || !segment.unknown) return null;

  let info = readElement(head, segment.data);
  while (info && info.id !== ID.INFO) {
    if (
      info.unknown ||
      info.id === ID.SEEK_HEAD ||
      info.id === ID.CUES ||
      info.id === ID.CLUSTER
    ) {
      return null;
    }
    info = readElement(head, info.end);
  }
  if (!info || info.unknown || info.end > head.length) return null;

  let timecodeScale = 1_000_000;
  let hasDuration = false;
  for (let at = info.data; at < info.end; ) {
    const child = readElement(head, at);
    if (!child) return null;
    if (child.id === ID.DURATION) hasDuration = true;
    if (child.id === ID.TIMECODE_SCALE) {
      timecodeScale = readUint(head.subarray(child.data, child.end));
    }
    at = child.end;
  }

  return { info, timecodeScale, hasDuration };
}

function readClusterEnd(bytes: Uint8Array, start: number) {
  const cluster = readElement(bytes, start);
  if (cluster?.id !== ID.CLUSTER) return null;

  const first = readElement(bytes, cluster.data);
  if (first?.id !== ID.CLUSTER_TIME || first.end > bytes.length) return null;

  const clusterTime = readUint(bytes.subarray(first.data, first.end));
  let latest = 0;

  for (let at = first.end; at < bytes.length; ) {
    const element = readElement(bytes, at);
    if (!element) break;

    if (element.id === ID.BLOCK_GROUP) {
      at = element.data; // look inside
      continue;
    }
    if (element.id === ID.SIMPLE_BLOCK || element.id === ID.BLOCK) {
      const track = readVint(bytes, element.data, false);
      const offset = element.data + (track?.length ?? 0);
      if (track && offset + 2 <= bytes.length) {
        const time = ((bytes[offset] << 24) | (bytes[offset + 1] << 16)) >> 16;
        latest = Math.max(latest, time);
      }
    }
    if (element.unknown) break;
    at = element.end;
  }

  return clusterTime + latest;
}

export async function readWebmDuration(blob: Blob) {
  const header = parseHeader(await readBytes(blob.slice(0, HEAD_BYTES)));
  if (!header) return 0;

  for (let size = 1024 * 1024; ; size *= 4) {
    const tail = await readBytes(blob.slice(Math.max(0, blob.size - size)));

    for (
      let at = tail.lastIndexOf(0x1f);
      at >= 0;
      at = at ? tail.lastIndexOf(0x1f, at - 1) : -1
    ) {
      if (tail[at + 1] !== 0x43 || tail[at + 2] !== 0xb6) continue;

      const end = readClusterEnd(tail, at);
      if (end !== null) return (end * header.timecodeScale) / 1_000_000;
    }

    if (size >= blob.size || size >= MAX_TAIL_BYTES) return 0;
  }
}

export async function fixWebmDuration(blob: Blob, durationMs: number) {
  const head = await readBytes(blob.slice(0, HEAD_BYTES));
  const header = parseHeader(head);
  if (!header || header.hasDuration) return blob;

  const { info, timecodeScale } = header;

  const duration = new Uint8Array(11);
  duration.set([0x44, 0x89, 0x88]);
  new DataView(duration.buffer).setFloat64(
    3,
    (durationMs * 1_000_000) / timecodeScale,
  );

  const infoHeader = new Uint8Array(12);
  infoHeader.set([0x15, 0x49, 0xa9, 0x66]);
  const view = new DataView(infoHeader.buffer);
  view.setBigUint64(4, BigInt(info.size + duration.length));
  infoHeader[4] = 0x01;

  return new Blob(
    [
      head.slice(0, info.start),
      infoHeader,
      head.slice(info.data, info.end),
      duration,
      blob.slice(info.end),
    ],
    { type: blob.type },
  );
}
