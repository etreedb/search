import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { AppComponent } from '@app/app.component';
import { OAuthModule } from 'angular-oauth2-oidc';
import { DataModule } from '@data/data.module';
import { EtreeDbModule } from '@modules/etree-db/etree-db.module';
import { LoadingSpinnerComponent } from '@app/component-ui/loading-spinner/loading-spinner.component';
import { HttpStatus, HttpListener } from '@app/http/http-interceptor.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { PageNotFoundComponent } from '@app/page-not-found/page-not-found.component';
import { LoginComponent } from '@app/component/login/login.component';
import { LoginTakeComponent } from '@app/component/login-take/login-take.component';
import { LogoutComponent } from '@app/component/logout/logout.component';
import { UnauthorizedComponent } from '@app/component/unauthorized/unauthorized.component';
import { DefaultLayoutComponent } from './layout/default-layout/default-layout.component';
import { SourceAdminLayoutComponent } from './layout/source-admin-layout/source-admin-layout.component';
import { EtreeCollectionLayoutComponent } from './layout/etree-collection-layout/etree-collection-layout.component';
import { AppRoutingModule } from './app-routing';
import { EtreeCollectionModule } from '@modules/etree-collection/etree-collection.module';
import { SharedModule } from '@modules/shared/shared.module';
import { FooterComponent } from './layout/footer/footer.component';

import 'reflect-metadata';
import { UserModule } from '@modules/user/user.module';

@NgModule({
  declarations: [
    AppComponent,
    LoadingSpinnerComponent,
    PageNotFoundComponent,
    LoginComponent,
    LoginTakeComponent,
    LogoutComponent,
    UnauthorizedComponent,
    DefaultLayoutComponent,
    SourceAdminLayoutComponent,
    EtreeCollectionLayoutComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    DataModule,
    SharedModule,
    OAuthModule.forRoot({
      resourceServer: {
        allowedUrls: ['https://api.etreedb.org'],
        sendAccessToken: true,
      }
    }),
    AppRoutingModule,
  ],
  providers: [
    HttpListener,
    HttpStatus,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpListener,
      multi: true
    },
    Location,
    Title,
    {
      provide: LocationStrategy,
      useClass: PathLocationStrategy
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
