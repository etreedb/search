import { PerformanceSearchComponent } from './performance-search/performance-search.component';
import { SourceSearchComponent } from './source-search/source-search.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'performance/search',
    component: PerformanceSearchComponent
  },
  {
    path: 'source/search',
    component: SourceSearchComponent
  },
  {
    path: '',
    redirectTo: 'performance/search',
    pathMatch: 'full'
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];
