
// sw.js

// A unique name for your cache
const CACHE_NAME = 'innovatehub-cache-v1';

// List of files to cache during install (app shell)
// For now, keeping this minimal as assets are loaded via CDN or are dynamic (index.tsx)
const APP_SHELL_FILES = [
  '/index.html', // The main entry point
  // Consider adding other core static assets if they were locally hosted and versioned.
  // e.g., '/styles/main.css', '/images/logo.svg'
  // Avoid caching dynamic JavaScript bundles like '/index.tsx' directly without a cache-busting strategy.
];

self.addEventListener('install', (event) => {
  console.log('[SW] Install event');
  // Perform install steps
  // Example: Caching the app shell (optional for a very basic setup)
  // For this version, we'll skip aggressive caching in the install step
  // to avoid complexities with dynamic content without a build process.
  // event.waitUntil(
  //   caches.open(CACHE_NAME).then((cache) => {
  //     console.log('[SW] Caching app shell files:', APP_SHELL_FILES);
  //     return cache.addAll(APP_SHELL_FILES);
  //   }).catch(error => {
  //     console.error('[SW] Failed to cache app shell files during install:', error);
  //   })
  // );
  self.skipWaiting(); // Force the waiting service worker to become the active service worker.
});

self.addEventListener('activate', (event) => {
  console.log('[SW] Activate event');
  // Perform activate steps
  // Example: Clean up old caches (if CACHE_NAME changes)
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME && cacheName.startsWith('innovatehub-cache')) {
            console.log('[SW] Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  return self.clients.claim(); // Allow an active service worker to set itself as the controller for all clients within its scope.
});

self.addEventListener('fetch', (event) => {
  // console.log('[SW] Fetch event for:', event.request.url);

  // For now, implement a network-first strategy.
  // This service worker mainly serves to make the app installable.
  // More complex caching strategies can be added later if a build system is introduced.
  event.respondWith(
    fetch(event.request).catch((error) => {
      console.warn('[SW] Network request failed for:', event.request.url, error);
      // Optional: Could return a generic offline page if one was cached.
      // e.g., return caches.match('/offline.html');
      // For now, just let the browser handle the network error.
      // This means the app won't work offline unless assets are already in HTTP cache.
      throw error;
    })
  );
});
