import { Component } from '@angular/core';
import { ShnFlacArtistService } from '@data/service/shn-flac-artist.service';
import { AbstractHalLinkTable } from '../abstract-hal-link-table';

@Component({
  selector: 'app-shn-flac-artist-table',
  templateUrl: './shn-flac-artist-table.component.html',
  styleUrls: ['./shn-flac-artist-table.component.css']
})
export class ShnFlacArtistTableComponent extends AbstractHalLinkTable {
  constructor(
    protected halService: ShnFlacArtistService
  ) {
    super();
  }
}
