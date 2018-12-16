import { enableProdMode } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { JwksValidationHandler } from 'angular-oauth2-oidc';
import { authConfig } from './auth.config';
import { Title } from '@angular/platform-browser';

enableProdMode();

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'Search etreedb.org';
  public user: any;

  constructor(
    private oauthService: OAuthService,
    private titleService: Title
  ) {
    this.configureWithNewConfigApi();

    this.setTitle(this.title);
  }

  private configureWithNewConfigApi() {
    this.oauthService.configure(authConfig);
    this.oauthService.tokenValidationHandler = new JwksValidationHandler();
    this.oauthService.loadDiscoveryDocumentAndTryLogin();
  }

  public setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle);
  }

  public login(): void {
    this.oauthService.initImplicitFlow();
  }

  public isLoggedIn(): any {
    return this.oauthService.getIdentityClaims();
  }

  public logout(): void {
    this.user = null;
    this.oauthService.logOut();
  }

  ngOnInit() {
    this.oauthService.events.subscribe( event => {
      if (event.type === 'token_received') {
        this.oauthService.loadUserProfile().then( () => this.reloadUser());
      }
    });

    if (this.oauthService.hasValidAccessToken() && this.oauthService.getIdentityClaims()) {
      this.user = this.oauthService.getIdentityClaims();
    }
  }

  public reloadUser(): void {
    this.user = this.oauthService.getIdentityClaims();
  }
}

export const apiUrl = 'https://api.etreedb.org';
