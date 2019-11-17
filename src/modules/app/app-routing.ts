import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardUserService } from '@app/authorization/auth-guard-user.service';
import { AuthGuardSourceService } from '@app/authorization/auth-guard-source.service';
import { AuthGuardAdminService } from '@app/authorization/auth-guard-admin.service';
import { PageNotFoundComponent } from '@app/page-not-found/page-not-found.component';
import { LoginComponent } from '@app/component/login/login.component';
import { LoginTakeComponent } from '@app/component/login-take/login-take.component';
import { LogoutComponent } from '@app/component/logout/logout.component';
import { UnauthorizedComponent } from '@app/component/unauthorized/unauthorized.component';
import { DefaultLayoutComponent } from '@app/layout/default-layout/default-layout.component';
import { AdministrationLayoutComponent } from '@app/layout/administration-layout/administration-layout.component';
import { EtreeCollectionLayoutComponent } from './layout/etree-collection-layout/etree-collection-layout.component';
import { SourceAdminLayoutComponent } from './layout/source-admin-layout/source-admin-layout.component';
import { TorrentLayoutComponent } from './layout/torrent-layout/torrent-layout.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'db/index',
    pathMatch: 'full'
  },
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
    path: 'user',
    component: DefaultLayoutComponent,
      loadChildren: () =>
        import('@modules/user/user.module')
          .then(module => module.UserModule)
  },
  {
    path: 'db',
    component: DefaultLayoutComponent,
      loadChildren: () =>
        import('@modules/etree-db/etree-db.module')
          .then(module => module.EtreeDbModule)
  },
  {
    path: 'etree-collection',
    component: EtreeCollectionLayoutComponent,
      loadChildren: () =>
        import('@modules/etree-collection/etree-collection.module')
        .then(module => module.EtreeCollectionModule)
  },
  {
    path: 'source-admin',
    canActivate: [AuthGuardSourceService],
    component: SourceAdminLayoutComponent,
      loadChildren: () =>
        import('@modules/source-admin/source-admin.module')
        .then(module => module.SourceAdminModule)
  },
  {
    path: 'administration',
    canActivate: [AuthGuardAdminService],
    component: AdministrationLayoutComponent,
      loadChildren: () =>
        import('@modules/administration/administration.module')
        .then(module => module.AdministrationModule)
  },
  {
    path: 'torrent',
    component: TorrentLayoutComponent,
      loadChildren: () =>
      import('@modules/torrent/torrent.module')
        .then(module => module.TorrentModule)
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
