import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { AbstractShowForRole } from './abstract-show-for-role';
import { OAuthService } from 'angular-oauth2-oidc';
import { User } from 'src/app/data/schema/user';
import { Source } from 'src/app/data/schema/source';

@Directive({
  selector: '[appShowForRoleSource]'
})
export class ShowForRoleSourceDirective extends AbstractShowForRole implements OnInit {
  constructor(
    protected el: ElementRef,
    protected oauthService: OAuthService,
  ) {
    super(el, oauthService, 'source');
  }

  @Input('appShowForRoleSource') source: Source;

  // This extension of the abstract limits the directive to just artists
  // maintained by the user.
  ngOnInit() {
    if (! this.source) {
      return;
    }
    let hasPermission = false;
    const element = this.el.nativeElement;
    const user = this.oauthService.getIdentityClaims() as User;

    if (user) {
      user._embedded.role.forEach(role => {
        if (role.roleId === 'admin') {
          hasPermission = true;
        }
      });

      user._computed.sourceArtist.forEach( artistName => {
        if (artistName === this.source._embedded.performance._embedded.artist.name) {
          hasPermission = true;
        }
      });
    }

    if (hasPermission === false) {
      element.remove();

      return;
    }
  }
}
