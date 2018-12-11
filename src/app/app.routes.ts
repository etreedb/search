import { PerformanceSearchComponent } from './performance-search/performance-search.component';
import { SourceSearchComponent } from './source-search/source-search.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { IndexComponent } from './index/index.component';
import { ArtistComponent } from './artist/artist.component';
import { ArtistDetailComponent } from './artist-detail/artist-detail.component';
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'artist',
    component: ArtistComponent
  },
  {
    path: 'artist/:id',
    component: ArtistDetailComponent
  },
  {
    path: 'performance/:id',
    component: PerformanceSearchComponent
  },
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
