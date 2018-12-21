import { Routes } from '@angular/router';
import { AuthGuardUserService } from './application/authorization/auth-guard-user.service';
import { AuthGuardSourceService } from './application/authorization/auth-guard-source.service';
import { AuthGuardAdminService } from './application/authorization/auth-guard-admin.service';
import { LoginComponent } from './application/component/login/login.component';
import { LoginTakeComponent } from './application/component/login-take/login-take.component';
import { LogoutComponent } from './application/component/logout/logout.component';
import { UserHomeComponent } from './etree-db/component/user-home/user-home.component';
import { UserComponent } from './etree-db/component/user/user.component';
import { ArtistComponent } from './etree-db/component/artist/artist.component';
import { ArtistDetailComponent } from './etree-db/component/artist-detail/artist-detail.component';
import { PerformanceSearchComponent } from './etree-db/component/performance-search/performance-search.component';
import { PerformanceDetailComponent } from './etree-db/component/performance-detail/performance-detail.component';
import { SourceSearchComponent } from './etree-db/component/source-search/source-search.component';
import { SourceDetailComponent } from './etree-db/component/source-detail/source-detail.component';
import { IndexComponent } from './etree-db/component/index/index.component';
import { PageNotFoundComponent } from './application/component/page-not-found/page-not-found.component';

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
