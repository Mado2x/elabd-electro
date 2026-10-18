// اسم ذاكرة التخزين المؤقت للمنظومة
const CACHE_NAME = 'elabd-system-cache-v1';

// قائمة الملفات والمكتبات الخارجية المطلوب حفظها للعمل بدون إنترنت
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './app.js',
  './excel-engine.js',
  './manifest.json',
  'https://cdn.tailwindcss.com',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css',
  'https://fonts.googleapis.com/css2?family=Cairo:wght@400;500;600;700;800;900&display=swap',
  'https://unpkg.com/html5-qrcode',
  'https://cdn.jsdelivr.net/npm/xlsx@0.18.5/dist/xlsx.full.min.js',
  'https://cdn.jsdelivr.net/npm/sweetalert2@11'
];

// مرحلة التثبيت: حفظ الملفات في الكاش
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    }).then(() => self.skipWaiting())
  );
});

// مرحلة التنشيط: مسح أي كاش قديم عند نزول إصدار جديد
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// مرحلة جلب البيانات: قراءة الملفات من الكاش لو النت مقطوع
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      // لو الملف متخزن في الكاش هاته فوراً، لو مش موجود هاته من النت
      return cachedResponse || fetch(event.request).catch(() => {
        // في حالة انقطاع النت وعدم وجود استجابة، أرجع الصفحة الرئيسية إن كانت صفحة ملاحة
        if (event.request.mode === 'navigate') {
          return caches.match('./index.html');
        }
      });
    })
  );
});
