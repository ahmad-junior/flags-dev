// Timers in a worker keep running when the tab is in the background,
// unlike requestAnimationFrame on the page.

let timer: ReturnType<typeof setInterval> | undefined;

self.onmessage = ({ data: interval }: MessageEvent<number>) => {
  clearInterval(timer);
  if (interval > 0) {
    timer = setInterval(() => self.postMessage(null), interval);
  }
};
