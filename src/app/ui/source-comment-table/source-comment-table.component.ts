import { Component } from '@angular/core';
import { SourceCommentService } from '../../app.service/source-comment.service';
import { AbstractHalLinkTable } from '../abstract-hal-link-table';

@Component({
  selector: 'app-source-comment-table',
  templateUrl: './source-comment-table.component.html',
  styleUrls: ['./source-comment-table.component.css']
})
export class SourceCommentTableComponent extends AbstractHalLinkTable {
  constructor(
    protected halService: SourceCommentService
  ) {
    super();
  }
}
