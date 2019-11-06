import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardUserService } from '@app/authorization/auth-guard-user.service';
import { AuthGuardSourceService } from '@app/authorization/auth-guard-source.service';
import { AuthGuardAdminService } from '@app/authorization/auth-guard-admin.service';
import { ArtistComponent } from '@modules/etree-db/component/artist/artist.component';
import { ArtistCreateComponent } from '@modules/etree-db/component/artist-create/artist-create.component';
import { ArtistDetailComponent } from '@modules/etree-db/component/artist-detail/artist-detail.component';
import { PerformanceSearchComponent } from '@modules/etree-db/component/performance-search/performance-search.component';
import { PerformanceDetailComponent } from '@modules/etree-db/component/performance-detail/performance-detail.component';
import { SourceSearchComponent } from '@modules/etree-db/component/source-search/source-search.component';
import { SourceDetailComponent } from '@modules/etree-db/component/source-detail/source-detail.component';
import { IndexComponent } from '@modules/etree-db/component/index/index.component';
import { PerformanceCreateComponent } from '@modules/etree-db/component/performance-create/performance-create.component';
import { PerformanceEditComponent } from '@modules/etree-db/component/performance-edit/performance-edit.component';
import { SourceCreateComponent } from '@modules/etree-db/component/source-create/source-create.component';
import { SourceEditComponent } from '@modules/etree-db/component/source-edit/source-edit.component';
import { PerformanceImageCreateComponent } from './component/performance-image-create/performance-image-create.component';
import { ArtistLinkCreateComponent } from './component/artist-link-create/artist-link-create.component';
import { PerformanceLinkCreateComponent } from './component/performance-link-create/performance-link-create.component';
import { SourceLinkCreateComponent } from './component/source-link-create/source-link-create.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'db',
    pathMatch: 'full'
  },
  {
    path: '',
    children: [
      {
        path: 'index',
        component: IndexComponent
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
        path: 'artist-link/create',
        component: ArtistLinkCreateComponent,
        canActivate: [AuthGuardSourceService]
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
        path: 'performance-image/create',
        component: PerformanceImageCreateComponent,
        canActivate: [AuthGuardUserService]
      },
      {
        path: 'performance-link/create',
        component: PerformanceLinkCreateComponent,
        canActivate: [AuthGuardSourceService]
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
        path: 'source-link/create',
        component: SourceLinkCreateComponent,
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
      }
    ]
  }
 ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EtreeDbRoutingModule {}
