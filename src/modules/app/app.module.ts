import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { AppComponent } from '@app/app.component';
import { RouterModule } from '@angular/router';
import { routes } from '@app/app.routes';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { OAuthModule } from 'angular-oauth2-oidc';
import { DataModule } from '@data/data.module';
import { AuthModule } from '@modules/auth/auth.module';
import { EtreeDbModule } from '@modules/etree-db/etree-db.module';
import { LoadingSpinnerComponent } from '@modules/auth/component-ui/loading-spinner/loading-spinner.component';
import { HttpStatus, HttpListener } from '@modules/auth/http/http-interceptor.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { PageNotFoundComponent } from '@app/page-not-found/page-not-found.component';
import 'reflect-metadata';

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
