import { AuthConfig } from 'angular-oauth2-oidc';

export const environment = {
  production: false,
  apiUrl: 'http://docker.api.etreedb.org',
  title: 'search.etreedb.org',
  cacheLength: 86400,
  authConfig: <AuthConfig> {
    issuer: 'http://docker.api.etreedb.org',
    redirectUri: window.location.origin + '/login-take',
    clientId: 'search.etreedb.org',
    scope: '',
    oidc: false,
    showDebugInformation: false,
    userinfoEndpoint: 'http://docker.api.etreedb.org/me',
    requireHttps: false,
  }
};
