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
  page: {};
  showSpinner = false;
  private searchTerms = new Subject<string>();

  constructor(
    private performanceService: PerformanceService,
    private location: Location,
    private route: ActivatedRoute
    ) {}

  search(term: string): void {
    if (! term) {
      return;
    }

    this.showSpinner = true;
    this.performanceService.search(term).subscribe(data => {
      if (! data._embedded.performance.length) {
        this.performances = [];

        return;
      }

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
      if (! data._embedded.performance.length) {
        this.performances = [];

        return;
      }

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
