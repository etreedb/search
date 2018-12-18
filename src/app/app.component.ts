import { enableProdMode } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { OAuthService, AuthConfig } from 'angular-oauth2-oidc';
import { JwksValidationHandler } from 'angular-oauth2-oidc';
import { authConfig } from './auth.config';
import { Title } from '@angular/platform-browser';
import { HttpStatus } from './http-interceptor.service';

enableProdMode();

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'Search etreedb.org';
  public user: Object;
  public isNavbarCollapsed = true;
  public httpActivity: boolean;

  constructor(
    private oauthService: OAuthService,
    private titleService: Title,
    private httpStatus: HttpStatus
  ) {
    this.configureWithNewConfigApi(authConfig);
    this.setTitle(this.title);

    this.httpStatus.getHttpStatus().subscribe((status: boolean) => {
      this.httpActivity = status;
      console.log('status');
      console.log(status);
    });
  }

  private configureWithNewConfigApi(config: AuthConfig) {
    this.oauthService.configure(config);
    this.oauthService.tokenValidationHandler = new JwksValidationHandler();
    this.oauthService.loadDiscoveryDocumentAndTryLogin();
  }

  public setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle);
  }

  public login(): void {
    const config = authConfig;
    config.redirectUri = window.location.href;
    this.configureWithNewConfigApi(config);
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
        this.oauthService.loadUserProfile().then(
          () => this.user = this.oauthService.getIdentityClaims()
        );
      }
    });

    if (this.oauthService.hasValidAccessToken() && this.oauthService.getIdentityClaims()) {
      this.user = this.oauthService.getIdentityClaims();
    }
  }
}

export const apiUrl = 'https://api.etreedb.org';
