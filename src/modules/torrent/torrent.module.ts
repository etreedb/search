import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexComponent } from './component/index/index.component';
import { SharedModule } from '@modules/shared/shared.module';
import { TorrentRoutingModule } from './torrent-routing';
import { ArtistComponent } from './component/artist/artist.component';

@NgModule({
  declarations: [
    IndexComponent,
    ArtistComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    TorrentRoutingModule
  ]
})
export class TorrentModule { }
