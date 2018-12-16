import { enableProdMode } from '@angular/core';
import { Component } from '@angular/core';
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

export class AppComponent {
  title = 'Search etreedb.org';

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
}

export const apiUrl = 'https://api.etreedb.org';
