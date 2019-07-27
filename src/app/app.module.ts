import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { routes } from './app.routes';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { OAuthModule } from 'angular-oauth2-oidc';
import { DataModule } from './data/data.module';
import { AuthModule } from './auth/auth.module';
import { EtreeDbModule } from './etree-db/etree-db.module';
import { LoadingSpinnerComponent } from './auth/component-ui/loading-spinner/loading-spinner.component';
import 'reflect-metadata';
import { HttpStatus, HttpListener } from './auth/http/http-interceptor.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    LoadingSpinnerComponent,
    PageNotFoundComponent,
  ],
  imports: [
    AuthModule,
    DataModule,
    EtreeDbModule,

    BrowserModule,
    OAuthModule.forRoot({
      resourceServer: {
        allowedUrls: ['https://api.etreedb.org'],
        sendAccessToken: true,
      }
    }),
    RouterModule.forRoot(
      routes,
      { enableTracing: false } // degugging routes
    ),
    NgbModule,
    FormsModule
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
