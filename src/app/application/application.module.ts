import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './component/login/login.component';
import { LoginTakeComponent } from './component/login-take/login-take.component';
import { LogoutComponent } from './component/logout/logout.component';
import { PageNotFoundComponent } from './component/page-not-found/page-not-found.component';
import { HttpStatus, HttpListener } from './http/http-interceptor.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [],
/*    HttpListener,
    HttpStatus,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpListener,
      multi: true
    },
  ],
  */
  declarations: [
    LoginComponent,
    LoginTakeComponent,
    LogoutComponent,
    PageNotFoundComponent
  ]
})
export class ApplicationModule { }
