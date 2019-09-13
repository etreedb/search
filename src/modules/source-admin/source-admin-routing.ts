import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './component/index/index.component';
import { ArtistGroupHeaderFooterComponent } from './component/artist-group-header-footer/artist-group-header-footer.component';

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
    path: 'artist-group-header-footer/:artist_id',
    component: ArtistGroupHeaderFooterComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SourceAdminRoutingModule {}
