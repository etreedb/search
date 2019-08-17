import { Component, OnInit } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { User } from '@data/schema/user';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-unauthorized',
  templateUrl: './unauthorized.component.html',
  styleUrls: ['./unauthorized.component.css']
})
export class UnauthorizedComponent implements OnInit {
  public user: User;
  public roleId: string;

  constructor(
    protected oauthService: OAuthService,
    protected route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.queryParams
      .subscribe( queryParams => {
        this.roleId = queryParams.roleId;
      });

    this.user = this.oauthService.getIdentityClaims() as User;
  }

}
