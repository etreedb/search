import { Component } from '@angular/core';
import { ArtistService } from '@data/service/artist.service';
import { AbstractHalLinkTable } from '../abstract-hal-link-table';

@Component({
  selector: 'app-artist-table',
  templateUrl: './artist-table.component.html',
  styleUrls: ['./artist-table.component.css']
})
export class ArtistTableComponent extends AbstractHalLinkTable {
  constructor(
    protected halService: ArtistService
  ) {
    super();
  }
}
