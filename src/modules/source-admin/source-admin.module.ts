import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexComponent } from './component/index/index.component';
import { SourceAdminRoutingModule } from './source-admin-routing';
import { ArtistGroupHeaderFooterComponent } from './component/artist-group-header-footer/artist-group-header-footer.component';



@NgModule({
  declarations: [IndexComponent, ArtistGroupHeaderFooterComponent],
  imports: [
    CommonModule,
    SourceAdminRoutingModule
  ]
})
export class SourceAdminModule { }
