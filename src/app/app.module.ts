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
import { ApplicationModule } from './application/application.module';
import { EtreeDbModule } from './etree-db/etree-db.module';
import { LoadingSpinnerComponent } from './application/component-ui/loading-spinner/loading-spinner.component';

@NgModule({
  declarations: [
    AppComponent,
    LoadingSpinnerComponent
  ],
  imports: [
    ApplicationModule,
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
