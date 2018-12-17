import { PerformanceDetailComponent } from './performance-detail/performance-detail.component';
import { PerformanceSearchComponent } from './performance-search/performance-search.component';
import { SourceSearchComponent } from './source-search/source-search.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { IndexComponent } from './index/index.component';
import { ArtistComponent } from './artist/artist.component';
import { ArtistDetailComponent } from './artist-detail/artist-detail.component';
import { SourceDetailComponent } from './source-detail/source-detail.component';
import { Routes } from '@angular/router';
import { from } from 'rxjs';

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
    path: 'performance/search',
    component: PerformanceSearchComponent
  },
  {
    path: 'performance/:id',
    component: PerformanceDetailComponent
  },
  {
    path: 'source/search',
    component: SourceSearchComponent
  },
  {
    path: 'source/:id',
    component: SourceDetailComponent
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
