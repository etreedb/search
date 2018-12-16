import { AuthConfig } from 'angular-oauth2-oidc';

export const authConfig: AuthConfig = {
    issuer: 'https://api.etreedb.org/',
    redirectUri: window.location.origin + '/index.html',
    clientId: 'search.etreedb.org',
    scope: '',
    requireHttps: 'remoteOnly'
};
