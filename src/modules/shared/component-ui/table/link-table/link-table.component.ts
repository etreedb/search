import { Component, Input } from '@angular/core';
import { EntityLinkService } from '@data/service/entity-link.service';
import { AbstractHalLinkTable } from '../abstract-hal-link-table';
import { ArtistLink } from '@modules/data/schema/artist-link';
import { LinkInterface } from '@modules/data/schema/link-interface';

@Component({
  selector: 'app-link-table',
  templateUrl: './link-table.component.html',
  styleUrls: ['./link-table.component.css']
})
export class LinkTableComponent extends AbstractHalLinkTable {
  // One of artist, performance, source
  @Input()
  entityType: string;

  @Input()
  hideUploadButton: boolean;

  constructor(
    protected halService: EntityLinkService
  ) {
    super();
  }

  getLinks(): void {
    return this.halResponse._embedded[this.entityType + '_link'];
  }

  public patch(link: LinkInterface) {
    const newName = prompt('Enter a new description for the link', link.name);
    if (newName) {
      this.halService.patch(this.entityType + '-link', link, {description: name})
        .subscribe(success => this.loadLink());
    }
  }

  public delete(link: LinkInterface) {
    if (confirm('Are you sure you want to delete this image?')) {
      this.halService.delete(this.entityType + '-link', link)
        .subscribe(success => this.loadLink());
    }
  }
}
