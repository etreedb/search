import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexComponent } from './component/index/index.component';
import { AdministrationRoutingModule } from './administration-routing';
import { SharedModule } from '@modules/shared/shared.module';
import { SourceAdminComponent } from './component/source-admin/source-admin.component';
import { ArtistGroupComponent } from './component/artist-group/artist-group.component';
import { ArtistGroupDetailComponent } from './component/artist-group-detail/artist-group-detail.component';

@NgModule({
  declarations: [IndexComponent, SourceAdminComponent, ArtistGroupComponent, ArtistGroupDetailComponent],
  imports: [
    CommonModule,
    AdministrationRoutingModule,
    CommonModule,
    SharedModule
  ]
})
export class AdministrationModule { }
