import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { PerformanceService } from '../service/performance.service';
import { ActivatedRoute } from '@angular/router';
import { AppComponent } from '../app.component';
import { HalPerformance } from '../schema/hal-performance';

@Component({
  selector: 'app-performance-search',
  templateUrl: './performance-search.component.html',
  styleUrls: ['./performance-search.component.css']
})
export class PerformanceSearchComponent implements OnInit {
  public searchTerm: string;
  public showInstructions = true;
  public halPerformance: HalPerformance;

  constructor(
    private performanceService: PerformanceService,
    private location: Location,
    private route: ActivatedRoute,
    private appComponent: AppComponent
  ) {}

  search(term: string): void {
    if (! term) {
      return;
    }

    this.showInstructions = false;
    this.location.replaceState('performance/search', '?search=' + encodeURI(term));
    this.performanceService.search(term).subscribe( halPerformance => {
      this.halPerformance = halPerformance;

      this.appComponent.setTitle('Search Performances - ' + term);
    });
  }

  ngOnInit(): void {
    // This would print out the json object which contained
    // all of our query parameters for this particular route.
    this.route.queryParams.subscribe(params => {
      this.searchTerm = params.search;

      if (this.searchTerm) {
        this.search(this.searchTerm);
      }
    });

    this.appComponent.setTitle('Search Performances');
  }
}
