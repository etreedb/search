import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EtreeCollectionRoutingModule } from './etree-collection-routing';
import { IdentifierTableComponent } from './component-ui/identifier-table/identifier-table.component';
import { EtreeCollectionComponent } from './component/etree-collection/etree-collection.component';
import { CreatorDetailComponent } from './component/creator-detail/creator-detail.component';
import { SharedModule } from '@modules/shared/shared.module';

@NgModule({
  declarations: [
    EtreeCollectionComponent,
    IdentifierTableComponent,
    CreatorDetailComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    EtreeCollectionRoutingModule
  ],
  exports: [
    IdentifierTableComponent
  ]
})
export class EtreeCollectionModule { }
