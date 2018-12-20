import { Component } from '@angular/core';
import { PerformanceService } from '../../app.service/performance.service';
import { AbstractHalLinkTable } from '../abstract-hal-link-table';

@Component({
  selector: 'app-performance-table',
  templateUrl: './performance-table.component.html',
  styleUrls: ['./performance-table.component.css']
})
export class PerformanceTableComponent extends AbstractHalLinkTable {
  private lastSortField: string;

  constructor(
    protected halService: PerformanceService
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

    this.halResponse._embedded.performance.sort(function(a, b) {
      switch (field) {
        case 'performanceDate':
        case 'venue':
        case 'city':
        case 'state':
          if (a[field] < b[field]) {
            return -1 * modifier;
          }
          if (b[field] < a[field]) {
            return 1 * modifier;
          }
          break;
        case 'name':
          if (a._embedded.artist.name < b._embedded.artist.name) {
            return -1 * modifier;
          }
          if (b._embedded.artist.name < a._embedded.artist.name) {
            return 1 * modifier;
          }
      }

      return 0;
    });
  }
}
