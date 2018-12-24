import { ElementRef } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { Title } from '@angular/platform-browser';
import { HttpStatus } from './application/http/http-interceptor.service';
import { Router } from '@angular/router';
import { configuration } from './application/config/app.config';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  public user: any;
  public isNavbarCollapsed = true;
  public httpActivity: boolean;

  constructor(
    private oauthService: OAuthService,
    private titleService: Title,
    private httpStatus: HttpStatus,
    private router: Router,
    private elementRef: ElementRef
  ) {
    this.setTitle(configuration.title);

    this.httpStatus.getHttpStatus()
      .subscribe((status: boolean) => {
        this.httpActivity = status;

        if (status) {
          this.elementRef.nativeElement.ownerDocument.body.style.cursor = 'wait';
        } else {
          this.elementRef.nativeElement.ownerDocument.body.style.cursor = 'default';
        }
      });

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
