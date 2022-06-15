const LATEST_STATIC_SUB_CACHE_NAME = "static-v6";
const LATEST_DYNAMIC_SUB_CACHE_NAME = "dynamic-v2";


self.addEventListener("install" ,  e => {
    e.waitUntil(  
        caches.open(LATEST_STATIC_SUB_CACHE_NAME)
            .then(cache => {
                cache.addAll([
                    '/',
                    "/index.html",
                    "./blog/bootstrap.min.css",
                    "./script.js",
                ])
            })
    )
})




self.addEventListener("activate" , e => {
    const latestSubCacheList = [LATEST_DYNAMIC_SUB_CACHE_NAME , LATEST_STATIC_SUB_CACHE_NAME];

    e.waitUntil(
        caches.keys()
            .then(keys => Promise.all(keys.map(key => {
                if(!latestSubCacheList.includes(key)) {
                    return caches.delete(key)
                }
            })))
    );
});

self.addEventListener("fetch" , e => {
    e.respondWith(
        caches.match(e.request)
            .then(response => {
                if(response) return response; 


                return fetch(e.request)
                    .then(fetchResponse => {
                        return caches.open(LATEST_DYNAMIC_SUB_CACHE_NAME) // sub-cache name 
                            .then(cache => {
                                cache.put(e.request.url , fetchResponse.clone()) // we can consume this fetchResponse object once and when the promise the settled, the fetchResponse get empty, therefore we have to cerate a copy (clone from current response) and then store it in cache storage block
                                // first arg : request identifier , seconde arg : response 
                                // add method take an url as string and send a request and automatically store request response key-value pair.
                                // but put method, required us to provide request and response key-value pair. therefore put don't send any request and only store data we pass.
                                
                                
                                return fetchResponse; // we have to return fetch response promise to receive in that html or js code witch to the fetch request
                            });
                    }).catch(err => {
                        // do nothings
                    })
            })
    )
})