import { Component, Input } from '@angular/core';
import { AbstractHalLinkTable } from '../abstract-hal-link-table';
import { Source } from 'webpack-sources';
import { SourceLink } from '@modules/data/schema/source-link';
import { SourceLinkService } from '@modules/data/service/source-link.service';

@Component({
  selector: 'app-source-link-table',
  templateUrl: './source-link-table.component.html',
  styleUrls: ['./source-link-table.component.css']
})
export class SourceLinkTableComponent extends AbstractHalLinkTable {

  @Input()
  hideCreateButton: boolean;

  @Input()
  source: Source;

  constructor(
    protected halService: SourceLinkService
  ) {
    super();
  }

  public patch(link: SourceLink) {
    const newName = prompt('Enter a new name for the link', link.name);
    const newUrl = prompt('Enter a new url for the link', link.url);
    if (newName) {
      this.halService.patch(link, {name: newName, url: newUrl})
        .subscribe(success => this.loadLink());
    }
  }

  public delete(link: SourceLink) {
    if (confirm('Are you sure you want to delete this link?')) {
      this.halService.delete(link)
        .subscribe(success => this.loadLink());
    }
  }
}
