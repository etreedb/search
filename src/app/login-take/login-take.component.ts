import { Component, OnInit } from '@angular/core';
import { OAuthService, AuthConfig, JwksValidationHandler } from 'angular-oauth2-oidc';
import { authConfig } from '../auth.config';
import { Router, ActivatedRoute } from '@angular/router';
import { routerNgProbeToken } from '@angular/router/src/router_module';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-login-take',
  templateUrl: './login-take.component.html',
  styleUrls: ['./login-take.component.css']
})
export class LoginTakeComponent implements OnInit {

  constructor(
    private oauthService: OAuthService,
    private router: Router,
    private route: ActivatedRoute,
    private appComponent: AppComponent
  ) {
    this.configureWithNewConfigApi(authConfig);
    }

  private configureWithNewConfigApi(config: AuthConfig) {
    this.oauthService.configure(config);
    this.oauthService.tokenValidationHandler = new JwksValidationHandler();
    this.oauthService.loadDiscoveryDocumentAndTryLogin();
  }

  ngOnInit() {
    this.oauthService.events.subscribe(event => {
      if (event.type === 'token_received') {
        this.oauthService.loadUserProfile().then(
          () => this.route.queryParams
            .subscribe(params => {
              this.appComponent.login();
              this.router.navigateByUrl(params['etreedb_redirect_uri']);
            }));
          }
    });

    if (this.oauthService.hasValidAccessToken() && this.oauthService.getIdentityClaims()) {
      this.route.queryParams
        .subscribe(params => {
          this.appComponent.login();
          this.router.navigateByUrl(params['etreedb_redirect_uri']);
        });
    }
  }
}
