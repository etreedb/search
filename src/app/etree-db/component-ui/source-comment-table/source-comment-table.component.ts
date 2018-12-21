import { Component } from '@angular/core';
import { SourceCommentService } from '../../../data/service/source-comment.service';
import { AbstractHalLinkTable } from '../abstract-hal-link-table';

@Component({
  selector: 'app-source-comment-table',
  templateUrl: './source-comment-table.component.html',
  styleUrls: ['./source-comment-table.component.css']
})
export class SourceCommentTableComponent extends AbstractHalLinkTable {
  protected queryParams: any = {
    'filter': [
      {
        field: 'source',
        type: 'innerJoin',
        alias: 'source'
      },
      {
        field: 'performance',
        type: 'innerJoin',
        alias: 'performance',
        parentAlias: 'source',
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
    protected halService: SourceCommentService
  ) {
    super();
  }
}
