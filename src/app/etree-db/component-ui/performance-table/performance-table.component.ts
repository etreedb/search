import { Component } from '@angular/core';
import { PerformanceService } from '../../../data/service/performance.service';
import { AbstractHalLinkTable } from '../abstract-hal-link-table';
import { Performance } from 'src/app/data/schema/performance';

@Component({
  selector: 'app-performance-table',
  templateUrl: './performance-table.component.html',
  styleUrls: ['./performance-table.component.css']
})
export class PerformanceTableComponent extends AbstractHalLinkTable {
  public isToggled = {};
  private lastSortField: string;
  protected queryParams: any = {
    'filter': [
      {
        field: 'artist',
        type: 'innerJoin',
        alias: 'artist'
      }
    ],
    'order-by': [
      {
        field: 'name',
        type: 'field',
        direction: 'asc',
        alias: 'artist'
      },
      {
        field: 'performanceDate',
        type: 'field',
        direction: 'asc'
      }
    ]
  };

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

  toggle(performance: Performance) {
    this.isToggled[performance.id] = ! this.isToggled[performance.id];
  }
}
