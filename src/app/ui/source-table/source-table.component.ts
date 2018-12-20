import { Component } from '@angular/core';
import { SourceService } from '../../app.service/source.service';
import { AbstractHalLinkTable } from '../abstract-hal-link-table';

@Component({
  selector: 'app-source-table',
  templateUrl: './source-table.component.html',
  styleUrls: ['./source-table.component.css']
})
export class SourceTableComponent extends AbstractHalLinkTable {
  private lastSortField: string;

  constructor(
    protected halService: SourceService
  ) {
    super();
  }

  sort(field: string): void {
    let modifier = 1;
    if (this.lastSortField === field) {
      modifier = -1;
      this.lastSortField = '';
    } else {
      this.lastSortField = field;
    }

    this.halResponse._embedded.source.sort(function(a, b) {
      switch (field) {
        case 'performanceDate':
        if (a._embedded.performance.performanceDate < b._embedded.performance.performanceDate) {
          return -1 * modifier;
        }
        if (b._embedded.performance.performanceDate < a._embedded.performance.performanceDate) {
          return 1 * modifier;
        }
        break;
      case 'summary':
      case 'id':
          if (a[field] < b[field]) {
            return -1 * modifier;
          }
          if (b[field] < a[field]) {
            return 1 * modifier;
          }
          break;
        case 'name':
          if (a._embedded.performance._embedded.artist.name < b._embedded.performance._embedded.artist.name) {
            return -1 * modifier;
          }
          if (b._embedded.performance._embedded.artist.name < a._embedded.performance._embedded.artist.name) {
            return 1 * modifier;
          }
      }

      return 0;
    });
  }
}
