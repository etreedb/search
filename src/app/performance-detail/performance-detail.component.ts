import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PerformanceService } from '../performance.service';
import { PerformanceLinkService } from '../performance-link.service';
import { SourceService } from '../source.service';
import { Performance } from '../performance';
import { HalSource } from '../hal-source';
import { Source } from '../source';
import { PerformanceLink } from '../performance-link';
import { HalPerformanceLink } from '../hal-performance-link';
import { AppComponent } from '../app.component';
import { PerformanceAudit } from '../performance-audit';

@Component({
  selector: 'app-performance-detail',
  templateUrl: './performance-detail.component.html',
  styleUrls: ['./performance-detail.component.css']
})
export class PerformanceDetailComponent implements OnInit {
  private performanceId: number;
  public performance: Performance;
  public sources: Array<Source>;
  public audit: PerformanceAudit;
  public toggleSourcesFlag = false;
  public togglePerformanceLinksFlag = false;
  public toggleAuditFlag = false;
  public performanceLinks: Array<PerformanceLink>;
  public lastSortField: string;

  constructor(
    private route: ActivatedRoute,
    private performanceService: PerformanceService,
    private performanceLinkService: PerformanceLinkService,
    private sourceService: SourceService,
    private appComponent: AppComponent
) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.performanceId = +params['id']; // (+) converts string 'id' to a number

      this.performanceService.find(this.performanceId).subscribe(data => {
        this.performance = data;

        this.appComponent.setTitle(this.performance._embedded.artist.name + ' - ' + this.performance.performanceDate);

        this.sourceService
        .loadUrl(this.performance._embedded.source._links.self.href)
        .subscribe(sourceData => {
          this.sources = sourceData._embedded.source;
        });

        this.performanceLinkService
        .loadLink(this.performance._embedded.performanceLink._links.self)
        .subscribe( performanceLinkData => {
          this.performanceLinks = performanceLinkData._embedded.performance_link;
        });
      });
    });
  }

  toggleSources(): void {
    this.toggleSourcesFlag = ! this.toggleSourcesFlag;

    if (this.toggleSourcesFlag) {
      this.togglePerformanceLinksFlag = false;
      this.toggleAuditFlag = false;
    }
  }

  togglePerformanceLinks(): void {
    this.togglePerformanceLinksFlag = ! this.togglePerformanceLinksFlag;

    if (this.togglePerformanceLinksFlag) {
      this.toggleSourcesFlag = false;
      this.toggleAuditFlag = false;
    }
  }

  toggleAudit(): void {
    this.toggleAuditFlag = ! this.toggleAuditFlag;

    if (this.toggleAuditFlag) {
      this.toggleSourcesFlag = false;
      this.togglePerformanceLinksFlag = false;
    }

    if (! this.audit) {
      this.performanceService.audit(this.performance._links.audit)
        .subscribe( audit => this.audit = audit);
    }
  }
}
