import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './component/index/index.component';
import { ArtistGroupComponent } from './component/artist-group/artist-group.component';
import { ArtistGroupDetailComponent } from './component/artist-group-detail/artist-group-detail.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'index'
  },
  {
    path: 'index',
    component: IndexComponent
  },
  {
    path: 'artist-group',
    component: ArtistGroupComponent
  },
  {
    path: 'artist-group/:id',
    component: ArtistGroupDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministrationRoutingModule {}
