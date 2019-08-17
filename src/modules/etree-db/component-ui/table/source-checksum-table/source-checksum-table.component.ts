import { Component, OnInit } from '@angular/core';
import { AbstractHalLinkTable } from '../abstract-hal-link-table';
import { SourceChecksumService } from '@data/service/source-checksum.service';

@Component({
  selector: 'app-source-checksum-table',
  templateUrl: './source-checksum-table.component.html',
  styleUrls: ['./source-checksum-table.component.css']
})
export class SourceChecksumTableComponent extends AbstractHalLinkTable {
  protected queryParams: any = {
    'filter': [
    ],
    'order-by': [
      {
        field: 'name',
        type: 'field',
        direction: 'asc'
      }
    ]
  };

  constructor(
    protected halService: SourceChecksumService
  ) {
    super();
  }
}
