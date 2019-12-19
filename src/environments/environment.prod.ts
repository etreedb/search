import { AuthConfig } from 'angular-oauth2-oidc';

export const environment = {
  production: true,
  apiUrl: 'https://stage.etreedb.org',
  title: 'search.etreedb.org',
  cacheLength: 86400,
  authConfig: <AuthConfig> {
    issuer: 'https://stage.etreedb.org',
    redirectUri: window.location.origin + '/login-take',
    clientId: 'search.etreedb.org',
    scope: '',
    oidc: false,
    showDebugInformation: false,
    userinfoEndpoint: 'https://stage.etreedb.org/me'
  }
};
