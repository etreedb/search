import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { AppComponent } from './app.component';
import { PerformanceSearchComponent } from './performance-search/performance-search.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpErrorInterceptor } from './http-error.interceptor';
import { LoadingSpinnerComponent } from './ui/loading-spinner/loading-spinner.component';
import { RouterModule, Routes } from '@angular/router';
import { routes } from './app.routes';
import { SourceSearchComponent } from './source-search/source-search.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ArtistLookupComponent } from './ui/artist-lookup/artist-lookup.component';
import { IndexComponent } from './index/index.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { ArtistComponent } from './artist/artist.component';
import { ArtistDetailComponent } from './artist-detail/artist-detail.component';
import { PerformanceDetailComponent } from './performance-detail/performance-detail.component';
import { OAuthModule } from 'angular-oauth2-oidc';
import { SourceDetailComponent } from './source-detail/source-detail.component';
import { UserComponent } from './user/user.component';
import { AuditTableComponent } from './ui/audit-table/audit-table.component';
import { LinkTableComponent } from './ui/link-table/link-table.component';
import { PerformanceTableComponent } from './ui/performance-table/performance-table.component';
import { SourceTableComponent } from './ui/source-table/source-table.component';
import { HttpListener, HttpStatus } from './app.service/http-interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    PerformanceSearchComponent,
    LoadingSpinnerComponent,
    SourceSearchComponent,
    PageNotFoundComponent,
    ArtistLookupComponent,
    IndexComponent,
    ArtistComponent,
    ArtistDetailComponent,
    PerformanceDetailComponent,
    SourceDetailComponent,
    UserComponent,
    AuditTableComponent,
    LinkTableComponent,
    PerformanceTableComponent,
    SourceTableComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    OAuthModule.forRoot(
//      resourceServer: {
//        allowedUrls: ['https://api.etreedb.org'],
//        sendAccessToken: true,
//      }
    ),
    RouterModule.forRoot(
      routes,
      { enableTracing: false } // degugging routes
    ),
    NgbModule,
    FormsModule
  ],
  providers: [
    HttpListener, HttpStatus,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpListener,
      multi: true
    },
    Title,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true,
    },
    Location, {
      provide: LocationStrategy,
      useClass: PathLocationStrategy
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
