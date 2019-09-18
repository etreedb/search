import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexComponent } from './component/index/index.component';
import { SourceAdminRoutingModule } from './source-admin-routing';
import { ArtistGroupHeaderFooterComponent } from './component/artist-group-header-footer/artist-group-header-footer.component';
import { ArtistEditComponent } from './component/artist-edit/artist-edit.component';
import { SharedModule } from '@modules/shared/shared.module';
import { SourcePendingComponent } from './component/source-pending/source-pending.component';

@NgModule({
  declarations: [IndexComponent, ArtistGroupHeaderFooterComponent, ArtistEditComponent, SourcePendingComponent],
  imports: [
    CommonModule,
    SharedModule,
    SourceAdminRoutingModule
  ]
})
export class SourceAdminModule { }
