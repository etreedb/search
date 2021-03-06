import { Component, OnInit } from '@angular/core';
import { AppComponent } from '@app/app.component';
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
  public toggleUserFeedback: boolean;
  public toggleUserFeedbackPost: boolean;
  public toggleUserPerformancePost: boolean;

  constructor(
    private appComponent: AppComponent,
    private oauthService: OAuthService
  ) {
   }

  ngOnInit() {
    this.user = this.oauthService.getIdentityClaims();
console.log(this.oauthService.getAccessToken());
    console.log(this.user);
  }
}
