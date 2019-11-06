import { Component, Input } from '@angular/core';
import { AbstractHalLinkTable } from '../abstract-hal-link-table';
import { PerformanceLink } from '@modules/data/schema/performance-link';
import { PerformanceLinkService } from '@modules/data/service/performance-link.service';
import { Performance } from '@modules/data/schema/performance';

@Component({
  selector: 'app-performance-link-table',
  templateUrl: './performance-link-table.component.html',
  styleUrls: ['./performance-link-table.component.css']
})
export class PerformanceLinkTableComponent extends AbstractHalLinkTable {

  @Input()
  hideCreateButton: boolean;

  @Input()
  performance: Performance;

  constructor(
    protected halService: PerformanceLinkService
  ) {
    super();
  }

  public patch(link: PerformanceLink) {
    const newName = prompt('Enter a new name for the link', link.name);
    const newUrl = prompt('Enter a new url for the link', link.url);
    if (newName && newUrl) {
      this.halService.patch(link, {name: newName, url: newUrl})
        .subscribe(success => this.loadLink());
    }
  }

  public delete(link: PerformanceLink) {
    if (confirm('Are you sure you want to delete this link?')) {
      this.halService.delete(link)
        .subscribe(success => this.loadLink());
    }
  }
}
