/**
 * This page will check to see if the user is logged in
 * and if not it will redirect to the oauth login.
 *
 * The response from the oauth is handled by login-take
 */

import { Component, OnInit } from '@angular/core';
import { OAuthService, AuthConfig, JwksValidationHandler } from 'angular-oauth2-oidc';
import { Router, ActivatedRoute } from '@angular/router';
import { authConfig } from '../auth.config';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private redirect: string;

  constructor(
    private oauthService: OAuthService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.queryParams
      .subscribe(params => {
        if (! params['etreedb_redirect_uri']) {
          params['etreedb_redirect_uri'] = '/';
        }

        const config = authConfig;
        config.redirectUri = window.location.origin + '/login-take' + '?etreedb_redirect_uri=' + encodeURI(params['etreedb_redirect_uri']);
        this.configureWithNewConfigApi(config);
        this.oauthService.initImplicitFlow();
      });
  }

  private configureWithNewConfigApi(config: AuthConfig) {
    this.oauthService.configure(config);
    this.oauthService.tokenValidationHandler = new JwksValidationHandler();
    this.oauthService.loadDiscoveryDocumentAndTryLogin();
  }
}
