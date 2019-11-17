import { Component } from '@angular/core';
import { ShnFlacTorrentService } from '@data/service/shn-flac-torrent.service';
import { AbstractHalLinkTable } from '../abstract-hal-link-table';

@Component({
  selector: 'app-shn-flac-torrent-table',
  templateUrl: './shn-flac-torrent-table.component.html',
  styleUrls: ['./shn-flac-torrent-table.component.css']
})
export class ShnFlacTorrentTableComponent extends AbstractHalLinkTable {
  constructor(
    protected halService: ShnFlacTorrentService
  ) {
    super();
  }
}
