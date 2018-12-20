import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import { OAuthService } from 'angular-oauth2-oidc';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.css']
})
export class UserHomeComponent implements OnInit {
  public user: any;
  public togglePerformance: boolean;
  public toggleSource: boolean;
  public toggleSourceComment: boolean;
  public toggleFamily: boolean;
  public toggleFamilyExtended: boolean;

  constructor(
    private appComponent: AppComponent,
    private oauthService: OAuthService
  ) {
   }

  ngOnInit() {
    this.user = this.oauthService.getIdentityClaims();
  }
}
