import { Component } from '@angular/core';
import { FamilyService } from '../../../data/service/family.service';
import { AbstractHalLinkTable } from '../abstract-hal-link-table';

@Component({
  selector: 'app-family-table',
  templateUrl: './family-table.component.html',
  styleUrls: ['./family-table.component.css']
})
export class FamilyTableComponent extends AbstractHalLinkTable {
  protected queryParams: any = {
    'filter': [
      {
        field: 'familyUser',
        type: 'innerJoin',
        alias: 'familyUser'
      }
    ],
    'order-by': [
      {
        field: 'name',
        type: 'field',
        direction: 'asc',
        alias: 'familyUser'
      }
    ]
  };

  constructor(
    protected halService: FamilyService
  ) {
    super();
  }
}
