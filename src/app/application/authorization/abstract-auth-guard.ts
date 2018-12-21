import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { OAuthService, AuthConfig, JwksValidationHandler } from 'angular-oauth2-oidc';
import { authConfig } from '../config/auth.config';

export abstract class AbstractAuthGuard implements CanActivate {
  protected roleId = 'user';

  constructor (
    protected oauthService: OAuthService
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (! this.oauthService.hasValidAccessToken()) {
      return this.login(state);
    }

    const user: any = this.oauthService.getIdentityClaims();
    if (! user) {
      return this.login(state);
    }

    let isAuthorized = false;
    user._embedded.role.forEach(role => {
      if (role.roleId === this.roleId) {
        isAuthorized = true;
      }
    });

    if (! isAuthorized) {
      return this.login(state);
    }

    return isAuthorized;
  }

  protected login(state: RouterStateSnapshot): boolean {
    this.oauthService.logOut();
    // Send user to implicit flow
    const config = authConfig;
    config.redirectUri = window.location.origin + '/login-take' + '?etreedb_redirect_uri=' + encodeURI(state.url);
    this.configureWithNewConfigApi(config);
    this.oauthService.initImplicitFlow();

    return false;
  }

  private configureWithNewConfigApi(config: AuthConfig): void {
    this.oauthService.configure(config);
    this.oauthService.tokenValidationHandler = new JwksValidationHandler();
    this.oauthService.loadDiscoveryDocumentAndTryLogin();
  }
}
