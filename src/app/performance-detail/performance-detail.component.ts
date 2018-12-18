import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PerformanceService } from '../app.service/performance.service';
import { Performance } from '../app.schema/performance';
import { PerformanceLink } from '../app.schema/performance-link';
import { AppComponent } from '../app.component';
import { HalEntityLink } from '../app.schema/hal-entity-link';

@Component({
  selector: 'app-performance-detail',
  templateUrl: './performance-detail.component.html',
  styleUrls: ['./performance-detail.component.css']
})
export class PerformanceDetailComponent implements OnInit {
  public performance: Performance;
  public toggleSourcesFlag = false;
  public togglePerformanceLinksFlag = false;
  public toggleAuditFlag = false;
  public performanceLinks: Array<PerformanceLink>;
  public lastSortField: string;
  public halEntityLink: HalEntityLink;

  constructor(
    private route: ActivatedRoute,
    private performanceService: PerformanceService,
    private appComponent: AppComponent
) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.performanceService.find(+params['id']).subscribe(data => {
        this.performance = data;

        this.appComponent.setTitle(this.performance._embedded.artist.name + ' - ' + this.performance.performanceDate);
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
  }
}
