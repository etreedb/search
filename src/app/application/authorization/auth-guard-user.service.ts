import { Injectable } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { AbstractAuthGuard } from './abstract-auth-guard';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardUserService extends AbstractAuthGuard {
  constructor(
    protected oauthService: OAuthService,
    protected router: Router
  ) {
    super(oauthService, router, 'user');
  }
}
