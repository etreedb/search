import { AuthConfig } from 'angular-oauth2-oidc';

export const environment = {
  production: true,
  apiUrl: 'https://api.etreedb.org',
  title: 'search.etreedb.org',
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
