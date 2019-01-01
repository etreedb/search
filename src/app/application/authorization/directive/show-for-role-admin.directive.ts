import { Directive, ElementRef } from '@angular/core';
import { AbstractShowForRole } from './abstract-show-for-role';
import { OAuthService } from 'angular-oauth2-oidc';

@Directive({
  selector: '[appShowForRoleAdmin]'
})
export class ShowForRoleAdminDirective extends AbstractShowForRole {
  constructor(
    protected el: ElementRef,
    protected oauthService: OAuthService,
  ) {
    super(el, oauthService, 'admin');
  }
}
