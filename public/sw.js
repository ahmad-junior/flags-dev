const CACHE_VERSION = "flagsdev-cache-v1";

const APP_CACHE = `${CACHE_VERSION}-app`;
const ASSET_CACHE = `${CACHE_VERSION}-assets`;

const OFFLINE_URL = "/legal/offline";

const APP_SHELL = ["/", OFFLINE_URL, "/favicon.ico"];

// Install
self.addEventListener("install", (event) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(APP_CACHE);

      for (const url of APP_SHELL) {
        try {
          await cache.add(url);
        } catch (error) {
          console.warn("FlagsDev: Failed to cache", url, error);
        }
      }

      await self.skipWaiting();
    })(),
  );
});

// Activate
self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();

      await Promise.all(
        keys
          .filter(
            (key) =>
              key.startsWith("flagsdev-") &&
              key !== APP_CACHE &&
              key !== ASSET_CACHE,
          )
          .map((key) => caches.delete(key)),
      );

      await self.clients.claim();
    })(),
  );
});

// Fetch
self.addEventListener("fetch", (event) => {
  const request = event.request;
  const url = new URL(request.url);

  if (request.method !== "GET") return;
  if (url.origin !== self.location.origin) return;

  // Handle page navigation.
  if (request.mode === "navigate") {
    event.respondWith(
      (async () => {
        try {
          const response = await fetch(request);

          if (!response.ok) {
            throw new Error("Navigation request failed");
          }

          const cache = await caches.open(APP_CACHE);
          await cache.put(request, response.clone());

          return response;
        } catch {
          const cache = await caches.open(APP_CACHE);

          if (url.pathname === OFFLINE_URL) {
            return (await cache.match(OFFLINE_URL)) || Response.error();
          }

          return Response.redirect(
            new URL(OFFLINE_URL, self.location.origin).href,
            302,
          );
        }
      })(),
    );

    return;
  }

  if (
    url.pathname.startsWith("/_next/static/") ||
    url.pathname.startsWith("/images/") ||
    url.pathname.startsWith("/fonts/")
  ) {
    event.respondWith(
      (async () => {
        const cache = await caches.open(ASSET_CACHE);
        const cached = await cache.match(request);

        if (cached) return cached;

        try {
          const response = await fetch(request);

          if (response.ok) {
            await cache.put(request, response.clone());
          }

          return response;
        } catch {
          return Response.error();
        }
      })(),
    );
  }
});
