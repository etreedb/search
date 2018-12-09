import { PerformanceSearchComponent } from './performance-search/performance-search.component';
import { SourceSearchComponent } from './source-search/source-search.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { IndexComponent } from './index/index.component';
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
    component: IndexComponent,
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];
