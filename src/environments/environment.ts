import { AuthConfig } from 'angular-oauth2-oidc';

// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiUrl: 'https://api.etreedb.org',
  title: 'search.etreedb.org',
  cacheLength: 86400,
  authConfig: <AuthConfig> {
    issuer: 'https://api.etreedb.org',
    redirectUri: window.location.origin + '/',
    clientId: 'search.etreedb.org',
    scope: '',
    oidc: false,
    showDebugInformation: false,
    userinfoEndpoint: 'https://api.etreedb.org/me'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
