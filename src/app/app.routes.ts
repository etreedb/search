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
import { ArtistCreateComponent } from './etree-db/component/artist-create/artist-create.component';
import { ArtistDetailComponent } from './etree-db/component/artist-detail/artist-detail.component';
import { PerformanceSearchComponent } from './etree-db/component/performance-search/performance-search.component';
import { PerformanceDetailComponent } from './etree-db/component/performance-detail/performance-detail.component';
import { SourceSearchComponent } from './etree-db/component/source-search/source-search.component';
import { SourceDetailComponent } from './etree-db/component/source-detail/source-detail.component';
import { IndexComponent } from './etree-db/component/index/index.component';
import { PageNotFoundComponent } from './application/component/page-not-found/page-not-found.component';
import { PerformanceCreateComponent } from './etree-db/component/performance-create/performance-create.component';
import { PerformanceEditComponent } from './etree-db/component/performance-edit/performance-edit.component';
import { SourceCreateComponent } from './etree-db/component/source-create/source-create.component';
import { SourceEditComponent } from './etree-db/component/source-edit/source-edit.component';
import { UnauthorizedComponent } from './application/component/unauthorized/unauthorized.component';
import { PerformanceSearch2Component } from './etree-db/component/performance-search2/performance-search2.component';

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
    path: 'unauthorized',
    component: UnauthorizedComponent
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
    path: 'artist/create',
    component: ArtistCreateComponent,
    canActivate: [AuthGuardUserService]
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
    path: 'performance/search2',
    component: PerformanceSearch2Component
  },
  {
    path: 'performance/create',
    component: PerformanceCreateComponent,
    canActivate: [AuthGuardUserService]
  },
  {
    path: 'performance/edit/:id',
    component: PerformanceEditComponent,
    canActivate: [AuthGuardUserService]
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
    component: SourceCreateComponent,
    canActivate: [AuthGuardUserService]
  },
  {
    path: 'source/edit/:id',
    component: SourceEditComponent,
    canActivate: [AuthGuardSourceService]
  },
  {
    // Mapping from db
    path: 'shn/:id',
    redirectTo: 'source/:id'
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
