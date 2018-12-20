import { enableProdMode } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { OAuthService, AuthConfig, JwksValidationHandler } from 'angular-oauth2-oidc';
import { Title } from '@angular/platform-browser';
import { HttpStatus } from './app.service/http-interceptor.service';
import { Router, RouteConfigLoadEnd } from '@angular/router';
import { authConfig } from './auth.config';

enableProdMode();

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'search.etreedb.org';
  public user: any;
  public isNavbarCollapsed = true;
  public httpActivity: boolean;

  constructor(
    private oauthService: OAuthService,
    private titleService: Title,
    private httpStatus: HttpStatus,
    private router: Router
  ) {
    this.setTitle(this.title);

    this.httpStatus.getHttpStatus()
      .subscribe((status: boolean) => this.httpActivity = status);

    this.user = this.oauthService.getIdentityClaims();
    console.log(this.oauthService.getAccessToken());
  }

  public login() {
    this.user = this.oauthService.getIdentityClaims();
  }

  public setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle);
  }

  public logout(): void {
    this.user = null;
  }

  ngOnInit() {
/*
    if (this.oauthService.hasValidAccessToken() && this.oauthService.getIdentityClaims()) {
      this.user = this.oauthService.getIdentityClaims();
    }

      this.oauthService.events.subscribe(event => {
        console.log(event);
        console.log(this.oauthService.getIdentityClaims());

        if (event.type === 'token_received') {
          this.oauthService.loadUserProfile().then(
            () => this.user = this.oauthService.getIdentityClaims());
        }
      });
  */
  }

  public window() {
    return window;
  }
}

export const apiUrl = 'https://api.etreedb.org';
