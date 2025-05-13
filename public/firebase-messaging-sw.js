importScripts(
  "https://www.gstatic.com/firebasejs/10.13.2/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/10.13.2/firebase-messaging-compat.js"
);

const CACHE_NAME = `music-sns-v1`;

const firebaseConfig = {
  apiKey: "AIzaSyASfdt2aEbkdOc06TkrrWjcrsSWK3L184o",
  authDomain: "music-sns-932cc.firebaseapp.com",
  projectId: "music-sns-932cc",
  storageBucket: "music-sns-932cc.firebasestorage.app",
  messagingSenderId: "873188144165",
  appId: "1:873188144165:web:d387a00a890b59a0517bcc",
  measurementId: "G-9G97F2PM33",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Use the install event to pre-cache all initial resources.
self.addEventListener("install", (e) => {
  console.log("[Service Worker] Install");

  e.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE_NAME);
      console.log("[Service Worker] Caching all: app shell and content");
      console.log(self.registration.scope);
      // await cache.addAll(["music-sns/assets/"]);
    })()
  );
});

self.addEventListener("fetch", (e) => {
  e.respondWith(
    (async () => {
      const r = await caches.match(e.request);
      console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
      if (r) {
        return r;
      }
      const response = await fetch(e.request);
      const cache = await caches.open(cacheName);
      console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
      cache.put(e.request, response.clone());
      return response;
    })()
  );
});

self.addEventListener("push", (event) => {
  const data = event.data.json();
  return event.waitUntil(
    self.registration.showNotification(data.title || "New post", {
      body: data.body || "New post body",
    })
  );
});
