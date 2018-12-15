import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { PerformanceService } from '../performance.service';
import { SourceService } from '../source.service';
import { Performance } from '../performance';
import { HalSource } from '../hal-source';
import { Source } from '../source';

@Component({
  selector: 'app-performance-detail',
  templateUrl: './performance-detail.component.html',
  styleUrls: ['./performance-detail.component.css']
})
export class PerformanceDetailComponent implements OnInit {
  private performanceId: number;
  public performance: Performance;
  public sources: Array<Source>;
  public toggleSourcesFlag = false;
  public lastSortField: string;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private performanceService: PerformanceService,
    private sourceService: SourceService
) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.performanceId = +params['id']; // (+) converts string 'id' to a number

      this.performanceService.find(this.performanceId).subscribe(data => {
        this.performance = data;
        this.loadSources(this.performance._embedded.source._links.self.href);
      });
    });
  }

  loadSources(url: string) {
    this.sourceService.loadUrl(url).subscribe(data => {
      this.sources = data._embedded.source;
    });
  }

  toggleSources(): void {
    this.toggleSourcesFlag = ! this.toggleSourcesFlag;
  }

  sort(field: string): void {
    let modifier = 1;
    if (this.lastSortField === field) {
      modifier = -1;
      this.lastSortField = '';
    } else {
      this.lastSortField = field;
    }
  }
}
