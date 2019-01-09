import { ElementRef } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { Title } from '@angular/platform-browser';
import { HttpStatus } from './application/http/http-interceptor.service';
import { configuration } from './application/config/app.config';
import { plainToClass } from 'class-transformer';
import { User } from './data/schema/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  public user: User;
  public isNavbarCollapsed = true;
  public httpActivity: boolean;

  constructor(
    private oauthService: OAuthService,
    private titleService: Title,
    private httpStatus: HttpStatus,
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

    this.user = plainToClass(User, this.oauthService.getIdentityClaims());
//    console.log(this.oauthService.getAccessToken());
  }

  public login() {
    this.user = plainToClass(User, this.oauthService.getIdentityClaims());
  }

  public setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle);
  }

  public logout(): void {
    this.user = null;
  }

  public window() {
    return window;
  }
}
