import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, debounce } from 'rxjs/operators';
import { PerformanceService } from '../performance.service';
import { HalPerformance } from '../hal-performance';
import { Performance } from '../performance';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-performance-search',
  templateUrl: './performance-search.component.html',
  styleUrls: ['./performance-search.component.css']
})
export class PerformanceSearchComponent implements OnInit {
  halResponse$: Observable<HalPerformance>;
  halPerformance: HalPerformance;
  performances: Array<Performance>;
  searchTerm: string;
  links: {};
  page: {
    current: Number;
    count: Number;
  };
  showSpinner = false;
  lastSortField: string;

  constructor(
    private performanceService: PerformanceService,
    private location: Location,
    private route: ActivatedRoute
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

  search(term: string): void {
    if (! term) {
      return;
    }

    this.showSpinner = true;
    this.performanceService.search(term).subscribe(data => {
      this.page = {
        current: data.page,
        count: data.page_count
      };

      this.performances = data._embedded.performance;
      this.links = data._links;
      this.showSpinner = false;
    });

    this.location.replaceState('', '?search=' + encodeURI(term));
  }

  loadUrl(url: string): void {
    this.showSpinner = true;
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

  ngOnInit(): void {
    // This would print out the json object which contained
    // all of our query parameters for this particular route.
    this.route.queryParams.subscribe(params => {
      this.searchTerm = params.search;

      if (this.searchTerm) {
        this.search(this.searchTerm);
      }
    });
  }
}
