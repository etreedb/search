import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { AppComponent } from './app.component';
import { PerformanceSearchComponent } from './performance-search/performance-search.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpErrorInterceptor } from './http-error.interceptor';
import { HttpInterceptorHandler } from '@angular/common/http/src/interceptor';
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
import { LoginComponent } from './login/login.component';

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
    LoginComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    OAuthModule.forRoot(),
    RouterModule.forRoot(
      routes,
      { enableTracing: true }
    ),
    NgbModule,
    FormsModule
  ],
  providers: [
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
