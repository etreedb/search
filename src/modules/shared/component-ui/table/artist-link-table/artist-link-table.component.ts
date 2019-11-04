import { Component, Input } from '@angular/core';
import { EntityLinkService } from '@data/service/entity-link.service';
import { AbstractHalLinkTable } from '../abstract-hal-link-table';
import { ArtistLink } from '@modules/data/schema/artist-link';
import { LinkInterface } from '@modules/data/schema/link-interface';
import { ArtistLinkService } from '@modules/data/service/artist-link.service';
import { Artist } from '@modules/data/schema/artist';

@Component({
  selector: 'app-artist-link-table',
  templateUrl: './artist-link-table.component.html',
  styleUrls: ['./artist-link-table.component.css']
})

export class ArtistLinkTableComponent extends AbstractHalLinkTable {
  // One of artist, performance, source
  entityType = 'artist';

  @Input()
  hideCreateButton: boolean;

  @Input()
  artist: Artist;

  constructor(
    protected halService: ArtistLinkService
  ) {
    super();
  }

  getLinks(): void {
    return this.halResponse._embedded[this.entityType + '_link'];
  }

  public patch(artistLink: ArtistLink) {
    const newName = prompt('Enter a new name for the link', artistLink.name);
    const newUrl = prompt('Enter a new url for the link', artistLink.url);
    if (newName) {
      this.halService.patch(artistLink, {name: newName, url: newUrl})
        .subscribe(success => this.loadLink());
    }
  }

  public delete(link: ArtistLink) {
    if (confirm('Are you sure you want to delete this link?')) {
      this.halService.delete(link)
        .subscribe(success => this.loadLink());
    }
  }
}
