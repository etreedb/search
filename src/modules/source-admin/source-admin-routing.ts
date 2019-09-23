import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './component/index/index.component';
import { ArtistGroupHeaderFooterComponent } from './component/artist-group-header-footer/artist-group-header-footer.component';
import { ArtistEditComponent } from './component/artist-edit/artist-edit.component';
import { SourcePendingComponent } from './component/source-pending/source-pending.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'index/0'
  },
  {
    path: 'index',
    redirectTo: 'index/0'
  },
  {
    path: 'index/:artist_id',
    component: IndexComponent
  },
  {
    path: 'artist/edit/:artist_id',
    component: ArtistEditComponent
  },
  {
    path: 'artist-group/edit/:artist_id',
    component: ArtistGroupHeaderFooterComponent
  },
  {
    path: 'source/pending/:artist_group_id',
    component: SourcePendingComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SourceAdminRoutingModule {}
