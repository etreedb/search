import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { PerformanceService } from '../performance.service';
import { SourceService } from '../source.service';
import { Performance } from '../performance';
import { ActivatedRoute } from '@angular/router';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-performance-search',
  templateUrl: './performance-search.component.html',
  styleUrls: ['./performance-search.component.css']
})
export class PerformanceSearchComponent implements OnInit {
  performances: Array<Performance>;
  searchTerm: string;
  links: {};
  page: {
    current: Number;
    count: Number;
  };
  showSpinner = false;
  lastSortField: string;
  showInstructions = true;

  constructor(
    private performanceService: PerformanceService,
    private sourceService: SourceService,
    private location: Location,
    private route: ActivatedRoute,
    private appComponent: AppComponent
    ) {}

  sort(field: string): void {
    let modifier = 1;
    if (this.lastSortField === field) {
      modifier = -1;
      this.lastSortField = '';
    } else {
      this.lastSortField = field;
    }

    this.performances.sort(function(a, b) {
      switch (field) {
        case 'performanceDate':
        case 'venue':
        case 'city':
        case 'state':
          if (a[field] < b[field]) {
            return -1 * modifier;
          }
          if (b[field] < a[field]) {
            return 1 * modifier;
          }
          break;
        case 'name':
          if (a._embedded.artist.name < b._embedded.artist.name) {
            return -1 * modifier;
          }
          if (b._embedded.artist.name < a._embedded.artist.name) {
            return 1 * modifier;
          }
      }

      return 0;
    });
  }

  clearSearch(): void {
    this.showSpinner = false;
    this.showInstructions = true;
    this.performances = [];
    this.links = false;
    this.location.replaceState('performance/search');
  }

  search(term: string): void {
    if (! term) {
      return;
    }

    this.showSpinner = true;
    this.showInstructions = false;
    this.location.replaceState('performance/search', '?search=' + encodeURI(term));
    this.performanceService.search(term).subscribe(data => {
      this.page = {
        current: data.page,
        count: data.page_count
      };

      this.performances = data._embedded.performance;
      this.links = data._links;
      this.showSpinner = false;

      this.appComponent.setTitle('Search Performances - ' + term);
    });
  }

  loadUrl(url: string): void {
    this.showSpinner = true;
    this.showInstructions = false;
    this.performanceService.loadUrl(url).subscribe(data => {
      this.page = {
        current: data.page,
        count: data.page_count
      };
      this.performances = data._embedded.performance;
      this.links = data._links;
      this.showSpinner = false;
    });
  }

  loadSources(performance: Performance): void {
    if (performance.source) {
      return;
    }
    this.sourceService.loadUrl(performance._embedded.source._links.self.href).subscribe(data => {
      performance.source = data._embedded.source;
      console.log(performance);
    });
  }

  toggle(performance: Performance): void {
    performance.toggle = ! performance.toggle;
    this.loadSources(performance);
  }

  showBorder(performance: Performance): string {
    return performance.toggle ? 'solid' : '';
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
