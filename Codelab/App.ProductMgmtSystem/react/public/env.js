/*
 * Define default environment variables of the application.
 * You can customize these values by overriding them to public/configs/env-local.js (create this file if not exist).
 * Don't forget to uncomment the env-local.js <script> tag in index.html.
 * To enable tracking, replace tracker.appId with your app ID in env-local.js.
 */

window.config = {
  iam: {
    clientId: 'db4847f2371c4ebca2d9bb6f0b38b457', // Change to your client ID
    oauthDomain: 'https://oauth.develop.tekoapis.net',
  },
  tracker: {
    appId: '',
    host: 'https://tracking.develop.tekoapis.net',
    jsFile: 'https://tracker-js.dev.teko.vn/v2/tracker.full.min.js',
  },
  apiServices: {
    jupiter: 'https://firedeps-6850c-default-rtdb.firebaseio.com',
  },
};
