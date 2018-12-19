import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { OAuthService } from 'angular-oauth2-oidc';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(
    private router: Router,
    private oauthService: OAuthService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.oauthService.hasValidAccessToken()) {
      return true;
    } else {
      this.router.navigate(['/login'], {
        queryParams: {
          redirect_uri: state.url
        }
      });

      return false;
    }
  }
}
