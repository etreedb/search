import { Component, OnInit } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { plainToClass } from 'class-transformer';
import { User } from '@modules/data/schema/user';

@Component({
  selector: 'app-source-admin-layout',
  templateUrl: './source-admin-layout.component.html',
  styleUrls: ['./source-admin-layout.component.css']
})
export class SourceAdminLayoutComponent implements OnInit {
  public isNavbarCollapsed = true;
  public httpActivity: boolean;
  public user: User;

  constructor(
    private oauthService: OAuthService,
  ) {
  }

  ngOnInit() {
    this.user = plainToClass(User, this.oauthService.getIdentityClaims());
  }
}
