import { Component, OnInit } from '@angular/core';
import { OAuthService, JwksValidationHandler } from 'angular-oauth2-oidc';
import { environment } from '@env';
import { Router, ActivatedRoute } from '@angular/router';
import { AppComponent } from '@app/app.component';
import { User } from '@modules/data/schema/user';

@Component({
  selector: 'app-login-take',
  templateUrl: './login-take.component.html',
  styleUrls: ['./login-take.component.css']
})
export class LoginTakeComponent implements OnInit {
  public redirectUrl: string;
  public user: User;

  constructor(
    private oauthService: OAuthService,
    private appComponent: AppComponent,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.oauthService.configure(environment.authConfig);
    this.oauthService.tokenValidationHandler = new JwksValidationHandler();

    this.oauthService.events.subscribe(event => {
      if (event.type === 'token_received') {
        this.oauthService.loadUserProfile().then(
          () => {
            this.appComponent.login();

            this.route.queryParams
              .subscribe(params => {
                this.redirectUrl = params['etreedb_redirect_uri'];
                this.appComponent.login();
                this.router.navigateByUrl(this.redirectUrl);
              });
          });
        }
      }
    );
  }

  public ngOnInit() {
    this.oauthService.loadDiscoveryDocumentAndTryLogin();
  }
}
