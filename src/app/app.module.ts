import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { AppComponent } from './app.component';
import { PerformancesComponent } from './performances/performances.component';
import { PerformanceSearchComponent } from './performance-search/performance-search.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpErrorInterceptor } from './http-error.interceptor';
import { HttpInterceptorHandler } from '@angular/common/http/src/interceptor';
import { LoadingSpinnerComponent } from './ui/loading-spinner/loading-spinner.component';
import { RouterModule, Routes } from '@angular/router';
import { routes } from './app.routes';
import { SourceSearchComponent } from './source-search/source-search.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    PerformancesComponent,
    PerformanceSearchComponent,
    LoadingSpinnerComponent,
    SourceSearchComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(
      routes,
      { enableTracing: true }
    )
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true
    },
    Location, {
      provide: LocationStrategy,
      useClass: PathLocationStrategy
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
