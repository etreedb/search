import { Component } from '@angular/core';
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
export class LoginTakeComponent {

  constructor(
    private oauthService: OAuthService,
    private appComponent: AppComponent,
    private router: Router,
    private route: ActivatedRoute
  ) {
    if (this.oauthService.getIdentityClaims()) {
      this.router.navigate(['/']);
    }

    this.configureWithNewConfigApi(authConfig);
    this.oauthService.events.subscribe(event => {
      if (event.type === 'token_received') {
        this.oauthService.loadUserProfile().then(
          () => {
            appComponent.login();

            this.route.queryParams
            .subscribe(params => {
              this.appComponent.login();
              this.router.navigateByUrl(params['etreedb_redirect_uri']);
            });
          });
        }
      });
    }

  private configureWithNewConfigApi(config: AuthConfig): void {
    this.oauthService.configure(config);
    this.oauthService.tokenValidationHandler = new JwksValidationHandler();
    this.oauthService.loadDiscoveryDocumentAndTryLogin();
  }
}
