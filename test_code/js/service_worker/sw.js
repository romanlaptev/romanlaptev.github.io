"use strict";
//const CACHE_NAME = "v1";

//const CACHE_NAME = "network-or-cache-v1";
//const _TIMEOUT = 400;//ms on request

const CACHE_NAME = "cache-only-v1";
//const CACHE_NAME = "cache-and-update-v1";
//const CACHE_NAME = "cache-update-and-refresh-v1";
//const CACHE_NAME = "offline-fallback-v1";//Embedded fallback

const FILES_TO_CACHE = [
"test_service_worker.html",
"offline.html",
//"pages/",
//"pages/index.html",
//"pages/style.css",
//"pages/app.js",
//"pages/image-list.js",
//"pages/star-wars-logo.jpg",
//"pages/gallery/bountyHunters.jpg",
//"pages/gallery/myLittleVader.jpg",
//"pages/gallery/snowTroopers.jpg",
"css/bootstrap335.min.css",
"js/functions.js",
"js/main.js"
];

/*
//self.addEventListener(......
this.addEventListener("install", function(event) {
console.log("WORKER: install event in progress.", event);
	event.waitUntil(
		caches.open( CACHE_NAME ).then(function(cache) {
			return cache.addAll( FILES_TO_CACHE );
		})
	);

});//end event
*/
self.addEventListener("install", (event) => {
	event.waitUntil(
		caches.open( CACHE_NAME ).then( (cache) => cache.addAll( FILES_TO_CACHE) )
		// `skipWaiting()` необходим, потому что мы хотим активировать SW
		// и контролировать его сразу, а не после перезагрузки.
		.then(() => self.skipWaiting())
	);
});//end event

//self.addEventListener(......
this.addEventListener("fetch", function(event) {
console.log("WORKER: fetch event in progress.", event.request.url);
console.log(event);
console.log("-- event.request:", event.request);
console.log("-- event.request.mode:", event.request.mode);
	
	//var response;

	//https://habr.com/ru/post/279291/
	event.respondWith( 
		caches.match( event.request )
			.then(function(cachedResponse){// ищем запрашиваемый ресурс в хранилище кэша
	console.log("-- cachedResponse:", cachedResponse);

			if (cachedResponse) {// выдаём кэш, если он есть
				return cachedResponse;
			}

			// // иначе запрашиваем из сети как обычно
			// return fetch(event.request).catch(function(res){
	// console.log( res );
			// });
			})
	);

/*
	//https://habr.com/ru/company/2gis/blog/345552/
	//cache-only-v1
// Открываем наше хранилище кэша (CacheStorage API), выполняем поиск запрошенного ресурса.
// Обратите внимание, что в случае отсутствия соответствия значения Promise выполнится успешно, 
//но со значением `undefined`
	event.respondWith( 
		caches.open(CACHE_NAME).then(
			(cache) => cache.match( request ).then( 
					(matching) =>	matching || Promise.reject("no-match")
			)
		)
	);
*/

/*
//var MAX_AGE = 86400000;
//https://habr.com/ru/post/279291/
    event.respondWith(
        // ищем запрошенный ресурс среди закэшированных
        caches.match(event.request).then(function(cachedResponse) {
            var lastModified, fetchRequest;

            // если ресурс есть в кэше
            if (cachedResponse) {
                // получаем дату последнего обновления
                lastModified = new Date(cachedResponse.headers.get('last-modified'));
                // и если мы считаем ресурс устаревшим
                if (lastModified && (Date.now() - lastModified.getTime()) > MAX_AGE) {
                    
                    fetchRequest = event.request.clone();
                    // создаём новый запрос
                    return fetch(fetchRequest).then(function(response) {
                        // при неудаче всегда можно выдать ресурс из кэша
                        if (!response || response.status !== 200) {
                            return cachedResponse;
                        }
                        // обновляем кэш
                        caches.open(CACHE_NAME).then(function(cache) {
                            cache.put(event.request, response.clone());
                        });
                        // возвращаем свежий ресурс
                        return response;
                    }).catch(function() {
                        return cachedResponse;
                    });
                }
                return cachedResponse;
            }

            // запрашиваем из сети как обычно
            return fetch(event.request);
        })
    );
*/

//---------------------------------------
/*
	event.respondWith( 
		fetch( event.request )
		.catch(() => {
			return caches.open(CACHE_NAME)
			.then((cache) => {
				return cache.match("offline.html");
			});
		})
	);
*/

	//event.respondWith( 
/*
//https://codelabs.developers.google.com/codelabs/your-first-pwapp/#5
		caches.open(DATA_CACHE_NAME).then((cache) => {
		return fetch(evt.request)
		.then((response) => {
		// If the response was good, clone it and store it in the cache.
		if (response.status === 200) {
		cache.put(evt.request.url, response.clone());
		}
		return response;
		}).catch((err) => {
		// Network request failed, try to get it from the cache.
		return cache.match(evt.request);
		});
		})
*/	

		//https://habr.com/ru/company/2gis/blog/345552/
		//network-or-cache-v1
		// fromNetwork( event.request, _TIMEOUT ).catch((err) => {
// console.log("-- error: ", err );
			// return fromCache( event.request );
		// })
	
		
		//cache-and-update-v1
		// при событии fetch, мы используем кэш, и только потом обновляем его данным с сервера
		// Мы используем `respondWith()`, чтобы мгновенно ответить без ожидания ответа с сервера.
		//fromCache(event.request)

		//cache-update-and-refresh-v1
		//fromCache(event.request)

		//Embedded fallback
		// Можете использовать любую стратегию описанную выше.
		// Если она не отработает корректно, то используейте `Embedded fallback`.
		//networkOrCache(event.request).catch( () => useFallback() )
		
	//);//end respondWith
	
	//cache-and-update-v1
	// `waitUntil()` нужен, чтобы предотвратить прекращение работы worker'a до того как кэш обновиться.
	//event.waitUntil( updateCache( event.request ) );
	
	//cache-update-and-refresh-v1
	// event.waitUntil(
		// updateCache2(event.request)
		// // В конце, после получения "свежих" данных от сервера уведомляем всех клиентов.
		// .then( needRefreshData )
	// );	

	
});//end event


/*
this.addEventListener("activate", function(event) {
console.log("WORKER: activate event in progress.", event);
	// event.waitUntil(
		// caches.keys().then((keyList) => {
			// return Promise.all( keyList.map(
				// (key) => {
					// if (key !== CACHE_NAME) {
	// console.log("[ServiceWorker]  cache key: ", key);
						// return caches.delete(key);
					// }
				// })
			// );
		// })
	// );
});//end event
*/

self.addEventListener("activate", (event) => {
	// `self.clients.claim()` позволяет SW начать перехватывать запросы с самого начала,
	// это работает вместе с `skipWaiting()`, позволяя использовать `fallback` с самых первых запросов.
	event.waitUntil( self.clients.claim() );
});//end event



//--------------------------------------------------------
//https://habr.com/ru/company/2gis/blog/345552/
// Временно-ограниченный запрос.
function fromNetwork(request, _TIMEOUT) {
	return new Promise( (fulfill, reject) => {
		
		var timerId = setTimeout(reject, _TIMEOUT);
		fetch(request).then((response) => {
			clearTimeout( timerId );
			fulfill(response);
		}, reject);
		
	});
}//end

/*
function fromCache(request) {
// Открываем наше хранилище кэша (CacheStorage API), выполняем поиск запрошенного ресурса.
// Обратите внимание, что в случае отсутствия соответствия значения Promise выполнится успешно, 
//но со значением `undefined`
	return caches.open(CACHE_NAME).then((cache) =>
		cache.match( request ).then( (matching) =>
			matching || Promise.reject("no-match")
	));
}//end
*/

//----------------------------------------------------------
function updateCache(request) {
	return caches.open(CACHE_NAME).then( (cache) =>
		fetch(request).then( (response) =>
			cache.put( request, response)
		)
	);
}//end

//------------------------------------------------------- cache-update-and-refresh-v1
function updateCache2( request ) {
    return caches.open( CACHE_NAME ).then( (cache) =>
		fetch(request).then( (response) =>
			cache.put( request, response.clone() ).then( () => response )
		)
	);
}//end

// Шлём сообщения об обновлении данных всем клиентам.
function needRefreshData(response) {
	return self.clients.matchAll().then( (clients) => {
		clients.forEach( (client) => {// Подробнее про ETag можно прочитать тут https://en.wikipedia.org/wiki/HTTP_ETag
			var message = {
				type: 'refresh',
				url: response.url,
				eTag: response.headers.get('ETag')
			};
			// Уведомляем клиент об обновлении данных.
			client.postMessage( JSON.stringify(message) );
		});
	});
}//end

//--------------------------------------Embedded fallback
function networkOrCache(request) {
	return fetch(request)
		.then( (response) => response.ok ? response : fromCache(request))
		.catch( () => fromCache(request) );
}//end

const FALLBACK =
	'<div>\n' +
	'	<div>App Title</div>\n' +
	'	<h1>you are offline....</h1>\n' +
	'</div>';

function useFallback() {
	return Promise.resolve(new Response(FALLBACK, { headers: {
		'Content-Type': 'text/html; charset=utf-8'
	}}));
}//end

function fromCache(request) {
	return caches.open( CACHE).then( (cache) =>
		cache.match(request).then( (matching) =>
			matching || Promise.reject('no-match')
		));
}//end