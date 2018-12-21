import { Injectable } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { AbstractAuthGuard } from './abstract-auth-guard';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardAdminService extends AbstractAuthGuard {
  protected roleId = 'admin';
  constructor(
    protected oauthService: OAuthService
  ) {
    super(oauthService);
  }
}
