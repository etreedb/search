import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EtreeCollectionComponent } from './component/etree-collection/etree-collection.component';
import { CreatorDetailComponent } from './component/creator-detail/creator-detail.component';

export const routes: Routes = [
  {
    path: '',
    component: EtreeCollectionComponent
  },
  {
    path: 'creator-detail/:id',
    component: CreatorDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EtreeCollectionRoutingModule {}
