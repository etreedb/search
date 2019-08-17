import { ElementRef } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { User } from '@data/schema/user';

export abstract class AbstractShowForRole {
  constructor(
    protected el: ElementRef,
    protected oauthService: OAuthService,
    protected roleId: string
  ) {
    const element = el.nativeElement;
    const user = this.oauthService.getIdentityClaims() as User;

    if (! user) {
      element.remove();
      return;
    }

    let hasPermission = false;
    user._embedded.role.forEach(role => {
      if (role.roleId === roleId || role.roleId === 'admin') {
        hasPermission = true;
      }
    });

    if (hasPermission === false) {
      element.remove();
      return;
    }
  }
}
