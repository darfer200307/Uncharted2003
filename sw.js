// sw.js - Basic Service Worker

const CACHE_NAME = "v1";
const urlsToCache = [
  "/",             // your homepage
  "/index.html",   // main HTML file
  "/style.css",    // your CSS
  "/script.js",    // your JS
];

// Install event - caching files
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Opened cache");
      return cache.addAll(urlsToCache);
    })
  );
});

// Fetch event - serving cached files
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // Return cached file OR fetch from network
      return response || fetch(event.request);
    })
  );
});

// Activate event - cleanup old caches
self.addEventListener("activate", (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
