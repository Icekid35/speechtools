self.addEventListener('install',e=>{
  e.waitUntil(
    caches.open('static').then(cache=>{
     return cache.addAll(['/favicon.png',
     '/',
       '/home.js',
     '/manifest.json',
     '/index.html',
     '/text-to-speech.html',
     '/text-to-speech.png',
     '/image-to-speech.png',
     '/image-to-speech.html',
     '/image-to-text.png',
       '/image-to-text.html',
       '/text-to-speech.js',
       '/image-to-speech.js',
     'ios/144.png',
     '/image-to-text.js',
     'speech-to-text.png',
     '/style.css',
     'libs/eng.traineddata.gz',
'/style.js',

       
       'ios/1024.png',
'/loading.gif',
'libs/tesseract.js/dist/tesseract.min.js',
       '/libs/react.min.js',
      'maskable_icon.png',
'/libs/react-dom.min.js',
'/libs/babel.min.js',
   'libs/tesseract.js/dist/worker.min.js',
       
       'speech-to-text.js',
'speech-to-text.html',
'libs/tesseract.js-core/tesseract-core.wasm.js'
     ]) 
    })
    )
})

 async function fetchAndCache(req) {
  try{
  const fetched=await fetch(req)

      cache.put(req,fetched.clone())
      
    
    return res
  } catch (error) {
   
    return new Response('<h1>Network error happened</h1>', {
      status: 408,
      headers: { 'Content-Type': 'text/html' },
  })
  }
}
self.addEventListener('fetch',e=>{
  e.respondWith(
   caches.match(e.request).then(response=>{
     return response || fetchAndCache(e.request)
     }) 
    )
})
