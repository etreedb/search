import { enableProdMode } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { Title } from '@angular/platform-browser';
import { HttpStatus } from './app.service/http-interceptor.service';
import { Router } from '@angular/router';

enableProdMode();

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'Search etreedb.org';
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
  }

  public setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle);
  }

  public logout(): void {
    this.user = null;
  }

  public login(): void {
    this.user = this.oauthService.getIdentityClaims();
  }

  ngOnInit() {
    if (this.oauthService.hasValidAccessToken() && this.oauthService.getIdentityClaims()) {
      this.user = this.oauthService.getIdentityClaims();
    }
  }

  public window() {
    return window;
  }
}

export const apiUrl = 'https://api.etreedb.org';
