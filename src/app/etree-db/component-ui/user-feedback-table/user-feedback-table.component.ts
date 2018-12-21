import { Component } from '@angular/core';
import { UserFeedbackService } from '../../../data/service/user-feedback.service';
import { AbstractHalLinkTable } from '../abstract-hal-link-table';

@Component({
  selector: 'app-user-feedback-table',
  templateUrl: './user-feedback-table.component.html',
  styleUrls: ['./user-feedback-table.component.css']
})
export class UserFeedbackTableComponent extends AbstractHalLinkTable {
  protected queryParams: any = {
    'filter': [
      {
        field: 'postUser',
        type: 'innerJoin',
        alias: 'postUser'
      }
    ],
    'order-by': [
      {
        field: 'name',
        type: 'field',
        direction: 'asc',
        alias: 'postUser'
      }
    ]
  };

  constructor(
    protected halService: UserFeedbackService
  ) {
    super();
   }
}
