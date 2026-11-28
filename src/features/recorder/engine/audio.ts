import { withTimeout } from "./session";

export function createAudioMixer(tracks: MediaStreamTrack[]) {
  const context = new AudioContext();
  const destination = context.createMediaStreamDestination();

  for (const track of tracks) {
    context
      .createMediaStreamSource(new MediaStream([track]))
      .connect(destination);
  }

  context.onstatechange = () => {
    if (context.state !== "running" && context.state !== "closed") {
      void context.resume().catch(() => {});
    }
  };

  return {
    ready: withTimeout(context.resume(), 3000, "Audio engine"),
    track: destination.stream.getAudioTracks()[0],
    dispose() {
      context.onstatechange = null;
      destination.stream.getTracks().forEach((track) => track.stop());
      if (context.state !== "closed") void context.close().catch(() => {});
    },
  };
}
