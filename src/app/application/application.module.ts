import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpStatus, HttpListener } from './http/http-interceptor.service';
import { LoginComponent } from './component/login/login.component';
import { LoginTakeComponent } from './component/login-take/login-take.component';
import { LogoutComponent } from './component/logout/logout.component';
import { PageNotFoundComponent } from './component/page-not-found/page-not-found.component';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    HttpListener,
    HttpStatus,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpListener,
      multi: true
    },
  ],
  declarations: [
//    LoadingSpinnerComponent, // Loaded in app.module
    LoginComponent,
    LoginTakeComponent,
    LogoutComponent,
    PageNotFoundComponent
  ]
})
export class ApplicationModule { }
