if(!self.define){let e,s={};const n=(n,t)=>(n=new URL(n+".js",t).href,s[n]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=n,e.onload=s,document.head.appendChild(e)}else e=n,importScripts(n),s()})).then((()=>{let e=s[n];if(!e)throw new Error(`Module ${n} didn’t register its module`);return e})));self.define=(t,a)=>{const i=e||("document"in self?document.currentScript.src:"")||location.href;if(s[i])return;let c={};const v=e=>n(e,i),r={module:{uri:i},exports:c,require:v};s[i]=Promise.all(t.map((e=>r[e]||v(e)))).then((e=>(a(...e),c)))}}define(["./workbox-7c2a5a06"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/app-build-manifest.json",revision:"0ff0822002006849ee7b517c99f430c8"},{url:"/_next/static/chunks/0e5ce63c-36429859379b2b4b.js",revision:"pWYKAyWvvpImOJvS7GdLy"},{url:"/_next/static/chunks/1626-e52831412a3ca8f1.js",revision:"pWYKAyWvvpImOJvS7GdLy"},{url:"/_next/static/chunks/2346-708b75c066c20659.js",revision:"pWYKAyWvvpImOJvS7GdLy"},{url:"/_next/static/chunks/3053-8bf3391d7b3ed7f0.js",revision:"pWYKAyWvvpImOJvS7GdLy"},{url:"/_next/static/chunks/322-fc7c66e97982277a.js",revision:"pWYKAyWvvpImOJvS7GdLy"},{url:"/_next/static/chunks/3380-8f7c00a73d1a5f7c.js",revision:"pWYKAyWvvpImOJvS7GdLy"},{url:"/_next/static/chunks/3806-4d63ac3c130c98ed.js",revision:"pWYKAyWvvpImOJvS7GdLy"},{url:"/_next/static/chunks/3961-476e7cc2a5592f11.js",revision:"pWYKAyWvvpImOJvS7GdLy"},{url:"/_next/static/chunks/4072-b744a5c79152bca5.js",revision:"pWYKAyWvvpImOJvS7GdLy"},{url:"/_next/static/chunks/4724-8386401e328e00e5.js",revision:"pWYKAyWvvpImOJvS7GdLy"},{url:"/_next/static/chunks/4889-f8ef47f32923a0df.js",revision:"pWYKAyWvvpImOJvS7GdLy"},{url:"/_next/static/chunks/5287-54c24b92a065bb34.js",revision:"pWYKAyWvvpImOJvS7GdLy"},{url:"/_next/static/chunks/5376-ada69964f99a4680.js",revision:"pWYKAyWvvpImOJvS7GdLy"},{url:"/_next/static/chunks/5526-7f435214009f56c1.js",revision:"pWYKAyWvvpImOJvS7GdLy"},{url:"/_next/static/chunks/6185-13e8b0384b08d2c2.js",revision:"pWYKAyWvvpImOJvS7GdLy"},{url:"/_next/static/chunks/7070-5c2cfacdcccb4988.js",revision:"pWYKAyWvvpImOJvS7GdLy"},{url:"/_next/static/chunks/765-7c1e1b3206c98496.js",revision:"pWYKAyWvvpImOJvS7GdLy"},{url:"/_next/static/chunks/7864-9192adb52b8d4a34.js",revision:"pWYKAyWvvpImOJvS7GdLy"},{url:"/_next/static/chunks/8018-aa044d7d33a93541.js",revision:"pWYKAyWvvpImOJvS7GdLy"},{url:"/_next/static/chunks/8111-3244521de3a2c901.js",revision:"pWYKAyWvvpImOJvS7GdLy"},{url:"/_next/static/chunks/8735-7f0738524dfa35e5.js",revision:"pWYKAyWvvpImOJvS7GdLy"},{url:"/_next/static/chunks/891-a085f75903dc6cba.js",revision:"pWYKAyWvvpImOJvS7GdLy"},{url:"/_next/static/chunks/8925-c8696d3917a12f1c.js",revision:"pWYKAyWvvpImOJvS7GdLy"},{url:"/_next/static/chunks/8945-4ac6fb673845c954.js",revision:"pWYKAyWvvpImOJvS7GdLy"},{url:"/_next/static/chunks/9216-9f754c937f133cf8.js",revision:"pWYKAyWvvpImOJvS7GdLy"},{url:"/_next/static/chunks/9505-07aff4adb19486fb.js",revision:"pWYKAyWvvpImOJvS7GdLy"},{url:"/_next/static/chunks/app/(auth)/layout-58b1522b847d1fed.js",revision:"pWYKAyWvvpImOJvS7GdLy"},{url:"/_next/static/chunks/app/(auth)/login/page-ac6983a61b907028.js",revision:"pWYKAyWvvpImOJvS7GdLy"},{url:"/_next/static/chunks/app/(routes)/dashboard/page-6b603791c41f9252.js",revision:"pWYKAyWvvpImOJvS7GdLy"},{url:"/_next/static/chunks/app/(routes)/layout-348a4973b9b9d5ea.js",revision:"pWYKAyWvvpImOJvS7GdLy"},{url:"/_next/static/chunks/app/(routes)/maintenance/%5BmaintenanceId%5D/edit/page-e47bb0c7a0a655de.js",revision:"pWYKAyWvvpImOJvS7GdLy"},{url:"/_next/static/chunks/app/(routes)/maintenance/%5BmaintenanceId%5D/page-d5984e43e8e5b4f7.js",revision:"pWYKAyWvvpImOJvS7GdLy"},{url:"/_next/static/chunks/app/(routes)/maintenance/category/loading-8edc5671905d42a7.js",revision:"pWYKAyWvvpImOJvS7GdLy"},{url:"/_next/static/chunks/app/(routes)/maintenance/category/page-cb3dbf8c30415443.js",revision:"pWYKAyWvvpImOJvS7GdLy"},{url:"/_next/static/chunks/app/(routes)/maintenance/layout-433ee48ceeb1c6af.js",revision:"pWYKAyWvvpImOJvS7GdLy"},{url:"/_next/static/chunks/app/(routes)/maintenance/loading-ee72a4488210dc1d.js",revision:"pWYKAyWvvpImOJvS7GdLy"},{url:"/_next/static/chunks/app/(routes)/maintenance/page-b5e98103014ee25e.js",revision:"pWYKAyWvvpImOJvS7GdLy"},{url:"/_next/static/chunks/app/(routes)/maintenance/request/add/loading-4e7b9a97a10decbf.js",revision:"pWYKAyWvvpImOJvS7GdLy"},{url:"/_next/static/chunks/app/(routes)/maintenance/request/add/page-20af85311f50107c.js",revision:"pWYKAyWvvpImOJvS7GdLy"},{url:"/_next/static/chunks/app/(routes)/maintenance/request/loading-041031fc48d69594.js",revision:"pWYKAyWvvpImOJvS7GdLy"},{url:"/_next/static/chunks/app/(routes)/maintenance/request/page-fe1331d1394a34ec.js",revision:"pWYKAyWvvpImOJvS7GdLy"},{url:"/_next/static/chunks/app/(routes)/maintenance/setting/page-56ae8b2087d590a0.js",revision:"pWYKAyWvvpImOJvS7GdLy"},{url:"/_next/static/chunks/app/(routes)/profile/page-c37c435b2afc8ad1.js",revision:"pWYKAyWvvpImOJvS7GdLy"},{url:"/_next/static/chunks/app/(routes)/reminder/%5BreminderId%5D/edit/page-30b8abe15ebdc1fc.js",revision:"pWYKAyWvvpImOJvS7GdLy"},{url:"/_next/static/chunks/app/(routes)/reminder/%5BreminderId%5D/page-3bbc6414f952c721.js",revision:"pWYKAyWvvpImOJvS7GdLy"},{url:"/_next/static/chunks/app/(routes)/reminder/add/loading-7fd3f99381581fad.js",revision:"pWYKAyWvvpImOJvS7GdLy"},{url:"/_next/static/chunks/app/(routes)/reminder/add/page-8f9f61c6bffa0480.js",revision:"pWYKAyWvvpImOJvS7GdLy"},{url:"/_next/static/chunks/app/(routes)/reminder/loading-af77a2180ab28612.js",revision:"pWYKAyWvvpImOJvS7GdLy"},{url:"/_next/static/chunks/app/(routes)/reminder/page-dc7ea00da48bc10f.js",revision:"pWYKAyWvvpImOJvS7GdLy"},{url:"/_next/static/chunks/app/(routes)/staff/%5BstaffId%5D/edit/page-9c10e29c315cd73c.js",revision:"pWYKAyWvvpImOJvS7GdLy"},{url:"/_next/static/chunks/app/(routes)/staff/loading-90433a7e6ca904ce.js",revision:"pWYKAyWvvpImOJvS7GdLy"},{url:"/_next/static/chunks/app/(routes)/staff/new/page-41be398d298dc20e.js",revision:"pWYKAyWvvpImOJvS7GdLy"},{url:"/_next/static/chunks/app/(routes)/staff/page-d4c868a22c6ccea3.js",revision:"pWYKAyWvvpImOJvS7GdLy"},{url:"/_next/static/chunks/app/_not-found-6a14493e4a1096f8.js",revision:"pWYKAyWvvpImOJvS7GdLy"},{url:"/_next/static/chunks/app/layout-55a2af885ac44b0e.js",revision:"pWYKAyWvvpImOJvS7GdLy"},{url:"/_next/static/chunks/app/page-ba6010da4d7a4f60.js",revision:"pWYKAyWvvpImOJvS7GdLy"},{url:"/_next/static/chunks/fd9d1056-1ae2aabb6230a6f0.js",revision:"pWYKAyWvvpImOJvS7GdLy"},{url:"/_next/static/chunks/framework-964c2d6016b0d731.js",revision:"pWYKAyWvvpImOJvS7GdLy"},{url:"/_next/static/chunks/main-84d55f576eb5ef1d.js",revision:"pWYKAyWvvpImOJvS7GdLy"},{url:"/_next/static/chunks/main-app-501c9c1e0214d5c6.js",revision:"pWYKAyWvvpImOJvS7GdLy"},{url:"/_next/static/chunks/pages/_app-16303979919e0d21.js",revision:"pWYKAyWvvpImOJvS7GdLy"},{url:"/_next/static/chunks/pages/_error-538b044d4acf5f05.js",revision:"pWYKAyWvvpImOJvS7GdLy"},{url:"/_next/static/chunks/polyfills-c67a75d1b6f99dc8.js",revision:"837c0df77fd5009c9e46d446188ecfd0"},{url:"/_next/static/chunks/webpack-865e295ea1985227.js",revision:"pWYKAyWvvpImOJvS7GdLy"},{url:"/_next/static/css/f930db62020b8423.css",revision:"f930db62020b8423"},{url:"/_next/static/media/591327bf3b62a611-s.woff2",revision:"0ed299a4bb5262e17e2145783b2c18f1"},{url:"/_next/static/media/87c72f23c47212b9-s.p.woff2",revision:"790d0c8dbcd491d29d58f1369c199d40"},{url:"/_next/static/media/916d3686010a8de2-s.woff2",revision:"9212f6f9860f9fc6c69b02fedf6db8c3"},{url:"/_next/static/pWYKAyWvvpImOJvS7GdLy/_buildManifest.js",revision:"7ad55293b7c6c7543c88ec23cfa3b392"},{url:"/_next/static/pWYKAyWvvpImOJvS7GdLy/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/icon-192x192.png",revision:"216862e00319868121cf533240348d66"},{url:"/icon-256x256.png",revision:"393ad2424c8b14eb17cfe010279ac506"},{url:"/icon-384x384.png",revision:"1e9d0c922d4994f33c19074c493c3734"},{url:"/icon-512x512.png",revision:"9f00fe025394c0225a45138fab0aec64"},{url:"/manifest.webmanifest",revision:"1c3389ab5b07f4c61de2620832868a7d"},{url:"/next.svg",revision:"8e061864f388b47f33a1c3780831193e"},{url:"/vercel.svg",revision:"61c6b19abff40ea7acd577be818f3976"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:n,state:t})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
