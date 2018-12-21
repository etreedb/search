import { AuthConfig } from 'angular-oauth2-oidc';

export const authConfig: AuthConfig = {
    issuer: 'https://api.etreedb.org',
    redirectUri: window.location.origin + '/',
    clientId: 'search.etreedb.org',
    scope: '',
    oidc: false,
    showDebugInformation: false,
    userinfoEndpoint: 'https://api.etreedb.org/me'
};
