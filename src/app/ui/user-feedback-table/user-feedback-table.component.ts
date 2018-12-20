import { Component } from '@angular/core';
import { UserFeedbackService } from '../../app.service/user-feedback.service';
import { AbstractHalLinkTable } from '../abstract-hal-link-table';

@Component({
  selector: 'app-user-feedback-table',
  templateUrl: './user-feedback-table.component.html',
  styleUrls: ['./user-feedback-table.component.css']
})
export class UserFeedbackTableComponent extends AbstractHalLinkTable {
  constructor(
    protected halService: UserFeedbackService
  ) {
    super();
   }
}
