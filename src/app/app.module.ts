import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { AppComponent } from './app.component';
import { PerformancesComponent } from './performances/performances.component';
import { PerformanceSearchComponent } from './performance-search/performance-search.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpErrorInterceptor } from './http-error.interceptor';
import { HttpInterceptorHandler } from '@angular/common/http/src/interceptor';
import { RouterModule } from '@angular/router';
import { LoadingSpinnerComponent } from './ui/loading-spinner/loading-spinner.component';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    PerformancesComponent,
    PerformanceSearchComponent,
    LoadingSpinnerComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot([])
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
