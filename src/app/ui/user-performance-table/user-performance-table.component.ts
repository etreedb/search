import { Component } from '@angular/core';
import { UserPerformanceService } from '../../app.service/user-performance.service';
import { AbstractHalLinkTable } from '../abstract-hal-link-table';

@Component({
  selector: 'app-user-performance-table',
  templateUrl: './user-performance-table.component.html',
  styleUrls: ['./user-performance-table.component.css']
})
export class UserPerformanceTableComponent extends AbstractHalLinkTable {
  protected queryParams: any = {
    'filter': [
      {
        field: 'performance',
        type: 'innerJoin',
        alias: 'performance'
      },
      {
        field: 'artist',
        type: 'innerJoin',
        alias: 'artist',
        parentAlias: 'performance'
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
        direction: 'asc',
        alias: 'performance'
      }
    ]
  };

  constructor(
    protected halService: UserPerformanceService
  ) {
    super();
   }
}
