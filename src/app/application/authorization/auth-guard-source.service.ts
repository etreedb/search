import { Injectable } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { AbstractAuthGuard } from './abstract-auth-guard';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardSourceService extends AbstractAuthGuard {
  protected roleId = 'source';
  constructor(
    protected oauthService: OAuthService
  ) {
    super(oauthService);
  }
}
