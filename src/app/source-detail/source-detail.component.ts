import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Source } from '../source';
import { SourceService } from '../source.service';
import { AppComponent } from '../app.component';
import { SourceLinkService } from '../source-link.service';
import { SourceLink } from '../source-link';
import { SourceAudit } from '../source-audit';
import { SourceComment } from '../source-comment';
import { SourceCommentService } from '../source-comment.service';

@Component({
  selector: 'app-source-detail',
  templateUrl: './source-detail.component.html',
  styleUrls: ['./source-detail.component.css']
})
export class SourceDetailComponent implements OnInit {
  public source: Source;
  public audit: SourceAudit;
  public sourceLinks: Array<SourceLink>;
  public sourceComments: Array<SourceComment>;
  public toggleSourceLinksFlag = false;
  public toggleAuditFlag = false;
  public toggleSourceCommentsFlag = false;

  constructor(
    private route: ActivatedRoute,
    private sourceService: SourceService,
    private appComponent: AppComponent,
    private sourceLinkService: SourceLinkService,
    private sourceCommentService: SourceCommentService
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

        this.sourceLinkService
          .loadLink(this.source._embedded.sourceLink._links.self)
          .subscribe( sourceLinkData => {
            this.sourceLinks = sourceLinkData._embedded.source_link;
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

    if (! this.audit) {
      this.sourceService.audit(this.source._links.audit)
        .subscribe( audit => this.audit = audit);
    }
  }
}
