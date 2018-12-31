import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { OAuthService, AuthConfig, JwksValidationHandler } from 'angular-oauth2-oidc';
import { authConfig } from '../config/auth.config';
import { User } from '../../data/schema/user';

export abstract class AbstractAuthGuard implements CanActivate {
  constructor (
    protected oauthService: OAuthService,
    protected router: Router,
    protected roleId: string
  ) {
    this.roleId = roleId;
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (! this.oauthService.hasValidAccessToken()) {
      return this.login(state);
    }

    const user = this.oauthService.getIdentityClaims() as User;
    if (! user) {
      return this.login(state);
    }

    let hasPermission = false;
    user._embedded.role.forEach(role => {
      if (role.roleId === this.roleId) {
        hasPermission = true;
      }
    });

    if (hasPermission) {
      return true;
    }

    // User is logged in but not authorized.  Send to 401 screen
    return this.router.parseUrl('unauthorized?roleId=' + this.roleId);
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
