const withPlugins = require('next-compose-plugins');
const withManifest = require('next-manifest');
const manifestConfig = {
  manifest: {
    // next-manifest options
    output: 'static/', // The folder where the manifest will be generated.
    // manifest options
    name: 'Test PWA',
    icons: [
      {
        src: '/static/icon-192.png',
        sizes: '192x192',
        type: 'image/png'
      },
      {
        src: '/static/icon-512.png',
        sizes: '512x512',
        type: 'image/png'
      }
    ],
    startUrl: '/',
    themeColor: '#0A0D0A',
    initialScale: 1
  }
};
const withOffline = require('next-offline');

const offlineConfig = {
  /*target: 'serverless',
  transformManifest: (manifest) => ['/'].concat(manifest), // add the homepage to the cache
  // Trying to set NODE_ENV=production when running yarn dev causes a build-time error so we
  // turn on the SW in dev mode so that we can actually test it
  generateInDevMode: true,
  workboxOpts: {
    swDest: 'static/service-worker.js',
    runtimeCaching: [
      {
        urlPattern: /^https?.*\
/,
        handler: 'NetworkFirst',
        options: {
          cacheName: 'https-calls',
          networkTimeoutSeconds: 15,
          expiration: {
            maxEntries: 150,
            maxAgeSeconds: 30 * 24 * 60 * 60 // 1 month
          },
          cacheableResponse: {
            statuses: [0, 200]
          }
        }
      }
    ]
  }*/
};

module.exports = withPlugins([
  [withOffline, offlineConfig],
  [withManifest, manifestConfig]
]);
