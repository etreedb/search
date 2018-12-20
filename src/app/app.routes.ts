import { PerformanceDetailComponent } from './performance-detail/performance-detail.component';
import { PerformanceSearchComponent } from './performance-search/performance-search.component';
import { SourceSearchComponent } from './source-search/source-search.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { IndexComponent } from './index/index.component';
import { ArtistComponent } from './artist/artist.component';
import { ArtistDetailComponent } from './artist-detail/artist-detail.component';
import { SourceDetailComponent } from './source-detail/source-detail.component';
import { Routes } from '@angular/router';
import { UserComponent } from './user/user.component';
import { UserHomeComponent } from './user-home/user-home.component';
import { LoginComponent } from './login/login.component';
import { LoginTakeComponent } from './login-take/login-take.component';
import { AuthGuardUserService } from './app.service/auth-guard-user.service';
import { AuthGuardSourceService } from './app.service/auth-guard-source.service';
import { AuthGuardAdminService } from './app.service/auth-guard-admin.service';
import { LogoutComponent } from './logout/logout.component';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [AuthGuardUserService]
  },
  {
    path: 'login-take',
    component: LoginTakeComponent
  },
  {
    path: 'logout',
    component: LogoutComponent
  },
  {
    path: 'home',
    component: UserHomeComponent,
    canActivate: [AuthGuardUserService]
  },
  {
    path: 'user/:username',
    component: UserComponent
  },
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
    path: 'source/create',
    component: SourceSearchComponent // ---
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
