import { Routes } from '@angular/router';
import { AuthGuardUserService } from '@modules/auth/authorization/auth-guard-user.service';
import { AuthGuardSourceService } from '@modules/auth/authorization/auth-guard-source.service';
import { AuthGuardAdminService } from '@modules/auth/authorization/auth-guard-admin.service';
import { LoginComponent } from '@modules/auth/component/login/login.component';
import { LoginTakeComponent } from '@modules/auth/component/login-take/login-take.component';
import { LogoutComponent } from '@modules/auth/component/logout/logout.component';
import { UserHomeComponent } from '@modules/etree-db/component/user-home/user-home.component';
import { UserComponent } from '@modules/etree-db/component/user/user.component';
import { ArtistComponent } from '@modules/etree-db/component/artist/artist.component';
import { ArtistCreateComponent } from '@modules/etree-db/component/artist-create/artist-create.component';
import { ArtistDetailComponent } from '@modules/etree-db/component/artist-detail/artist-detail.component';
import { PerformanceSearchComponent } from '@modules/etree-db/component/performance-search/performance-search.component';
import { PerformanceDetailComponent } from '@modules/etree-db/component/performance-detail/performance-detail.component';
import { SourceSearchComponent } from '@modules/etree-db/component/source-search/source-search.component';
import { SourceDetailComponent } from '@modules/etree-db/component/source-detail/source-detail.component';
import { IndexComponent } from '@modules/etree-db/component/index/index.component';
import { PageNotFoundComponent } from '@app/page-not-found/page-not-found.component';
import { PerformanceCreateComponent } from '@modules/etree-db/component/performance-create/performance-create.component';
import { PerformanceEditComponent } from '@modules/etree-db/component/performance-edit/performance-edit.component';
import { SourceCreateComponent } from '@modules/etree-db/component/source-create/source-create.component';
import { SourceEditComponent } from '@modules/etree-db/component/source-edit/source-edit.component';
import { UnauthorizedComponent } from '@modules/auth/component/unauthorized/unauthorized.component';
import { EtreeCollectionComponent } from '@modules/etree-db/component/etree-collection/etree-collection.component';
import { CreatorDetailComponent } from '@modules/etree-db/component/creator-detail/creator-detail.component';

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
    path: 'etree-collection',
    component: EtreeCollectionComponent
  },
  {
    path: 'creator-detail/:id',
    component: CreatorDetailComponent
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
