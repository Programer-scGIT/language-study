const CACHE_NAME = "language-study-v1";

const urlsToCache = [
    "./",
    "./index.html",
    "./style.css",
    "./app.js",
    "./index.js",
    "./logo.png"
];

self.addEventListener("install", event => {
    console.log("Service Worker installed");

    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                return cache.addAll(urlsToCache);
            })
    );
});

self.addEventListener("fetch", event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                return response || fetch(event.request);
            })
    );
});