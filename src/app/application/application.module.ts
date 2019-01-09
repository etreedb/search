import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './component/login/login.component';
import { LoginTakeComponent } from './component/login-take/login-take.component';
import { LogoutComponent } from './component/logout/logout.component';
import { PageNotFoundComponent } from './component/page-not-found/page-not-found.component';
import { UnauthorizedComponent } from './component/unauthorized/unauthorized.component';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
  ],
  declarations: [
    LoginComponent,
    LoginTakeComponent,
    LogoutComponent,
    PageNotFoundComponent,
    UnauthorizedComponent
  ]
})
export class ApplicationModule { }
