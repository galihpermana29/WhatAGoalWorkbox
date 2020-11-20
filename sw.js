importScripts(
	'https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js'
);

if (workbox) {
	console.log('Workbox berhasil dimuat');
} else {
	console.log('Workbox gagal dimuat');
}

workbox.precaching.precacheAndRoute(
	[
		// {url : '/index.html', revision: '1'},
		{ url: '/css/materialize.min.css', revision: '2' },
		{ url: '/js/materialize.min.js', revision: '2' },
		{ url: '/css/about.css', revision: '2' },
		{ url: '/css/list.css', revision: '2' },
		{ url: '/css/pl.css', revision: '2' },
		{ url: '/css/ucl.css', revision: '2' },
		{ url: '/js/api.js', revision: '2' },
		{ url: '/js/db.js', revision: '2' },
		{ url: '/js/getdata.js', revision: '2' },
		{ url: '/js/idb.js', revision: '2' },
		{ url: '/js/registersw.js', revision: '2' },
		{ url: '/js/setup.js', revision: '2' },
		{ url: '/pages/about.html', revision: '2' },
		{ url: '/manifest.json', revision: '2' },
		{ url: '/img/icons/', revision: '2' },
	],
	{
		// Ignore all URL parameters.
		ignoreURLParametersMatching: [/.*/],
	}
);

workbox.routing.registerRoute(
	new RegExp('/pages/about.html'),
	new workbox.strategies.CacheFirst()
);

workbox.routing.registerRoute(
	/^https:\/\/fonts\.googleapis\.com/,
	new workbox.strategies.StaleWhileRevalidate({
		cacheName: 'Google-fonts-stylesheets',
	})
);

workbox.routing.registerRoute(
	/^https:\/\/api\.football\-data\.org\/v2\//,
	new workbox.strategies.StaleWhileRevalidate({
		cacheName: 'API Request',
	})
);

workbox.routing.registerRoute(
	/^https:\/\/crests\.football\-data\.org\/(\w+)\.(svg|png|jpg|gif|vector|bitmap|JPEG)/,
	new workbox.strategies.StaleWhileRevalidate({
		cacheName: 'API Images Request',
		plugins: [
			new workbox.expiration.ExpirationPlugin({
				maxEntries: 60,
			}),
		],
	})
);

workbox.routing.registerRoute(
	/^([\/pages\/pl\.html|\/index.html])/,
	new workbox.strategies.StaleWhileRevalidate({
		cacheName: 'Pages',
	})
);

self.addEventListener('push', function (event) {
	let body;
	if (event.data) {
		body = event.data.text();
	} else {
		body = 'Push message no payload';
	}
	let options = {
		body: body,
		icon: '/img/72.png',
		vibrate: [100, 50, 100],
		data: {
			dateOfArrival: Date.now(),
			primaryKey: 1,
		},
	};
	event.waitUntil(
		self.registration.showNotification('Push Notification', options)
	);
});
