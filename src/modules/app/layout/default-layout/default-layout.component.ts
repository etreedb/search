import { Component } from '@angular/core';
import { User } from '@data/schema/user';
import { OAuthService } from 'angular-oauth2-oidc';
import { environment } from '@env';
import { plainToClass } from 'class-transformer';
import { AppComponent } from '@app/app.component';
import { HttpStatus } from '../../http/http-interceptor.service';

@Component({
  selector: 'app-default-layout',
  templateUrl: './default-layout.component.html',
  styleUrls: ['./default-layout.component.css']
})
export class DefaultLayoutComponent {
  public isNavbarCollapsed = true;
  public user: User;
  public httpActivity: boolean;

  constructor(
    private oauthService: OAuthService,
    private appComponent: AppComponent,
    private httpStatus: HttpStatus
  ) {
    this.httpStatus.getHttpStatus()
      .subscribe((status: boolean) => {
        this.httpActivity = status;
      });

    this.appComponent.setTitle(environment.title);

    this.user = plainToClass(User, this.oauthService.getIdentityClaims());
  }
}
