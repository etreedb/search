import { Injectable } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { AbstractAuthGuard } from './abstract-auth-guard';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardUserService extends AbstractAuthGuard {
  protected roleId = 'user';
  constructor(
    protected oauthService: OAuthService
  ) {
    super(oauthService);
  }
}
