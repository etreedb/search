import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Source } from '../source';
import { SourceService } from '../source.service';
import { AppComponent } from '../app.component';
import { SourceComment } from '../source-comment';
import { SourceCommentService } from '../source-comment.service';
import { Audit } from '../audit';

@Component({
  selector: 'app-source-detail',
  templateUrl: './source-detail.component.html',
  styleUrls: ['./source-detail.component.css']
})
export class SourceDetailComponent implements OnInit {
  public source: Source;
  public audit: Audit;
  public sourceComments: Array<SourceComment>;
  public toggleSourceLinksFlag = false;
  public toggleAuditFlag = false;
  public toggleSourceCommentsFlag = false;

  constructor(
    private route: ActivatedRoute,
    private sourceService: SourceService,
    private appComponent: AppComponent,
    private sourceCommentService: SourceCommentService,
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.sourceService.find(+params['id']).subscribe(data => {
        this.source = data;

        this.appComponent
          .setTitle(this.source._embedded.performance._embedded.artist.name
            + ' - '
            + this.source._embedded.performance.performanceDate
            + ' (source ' + this.source.id + ')'
          );

        this.sourceCommentService
          .loadLink(this.source._embedded.sourceComment._links.self)
          .subscribe( sourceCommentData => {
            this.sourceComments = sourceCommentData._embedded.source_comment;
          });
      });
    });
  }

  toggleSourceComments(): void {
    this.toggleSourceCommentsFlag = ! this.toggleSourceCommentsFlag;

    if (this.toggleSourceCommentsFlag) {
      this.toggleAuditFlag = false;
      this.toggleSourceLinksFlag = false;
    }
  }

  toggleSourceLinks(): void {
    this.toggleSourceLinksFlag = ! this.toggleSourceLinksFlag;

    if (this.toggleSourceLinksFlag) {
      this.toggleAuditFlag = false;
      this.toggleSourceCommentsFlag = false;
    }
  }

  toggleAudit(): void {
    this.toggleAuditFlag = ! this.toggleAuditFlag;

    if (this.toggleAuditFlag) {
      this.toggleSourceCommentsFlag = false;
      this.toggleSourceLinksFlag = false;
    }
  }
}
