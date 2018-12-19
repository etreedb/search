import { Component, OnInit, Input } from '@angular/core';
import { HalSourceComment } from '../../app.schema/hal-source-comment';
import { HalLink } from '../../app.schema/hal-link';
import { SourceCommentService } from '../../app.service/source-comment.service';

@Component({
  selector: 'app-source-comment-table',
  templateUrl: './source-comment-table.component.html',
  styleUrls: ['./source-comment-table.component.css']
})
export class SourceCommentTableComponent implements OnInit {
  @Input() halSourceComment: HalSourceComment;

  @Input()
  set halLink(halLink: HalLink) {
    this.loadLink(halLink);
  }

  constructor(
    private sourceCommentService: SourceCommentService
  ) { }

  ngOnInit() {
  }

  loadLink(halLink: HalLink): void {
    this.sourceCommentService.loadLink(halLink)
      .subscribe(halSourceComment => this.halSourceComment = halSourceComment);
  }

}
