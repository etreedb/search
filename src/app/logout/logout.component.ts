import { Component, OnInit } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(
    private oauthService: OAuthService,
    private router: Router,
    private appComponent: AppComponent
  ) { }

  ngOnInit() {
    this.oauthService.logOut();
    this.appComponent.logout();
    this.router.navigate(['/']);
  }
}
