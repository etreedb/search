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
  private searchTerms = new Subject<string>();

  constructor(
    private performanceService: PerformanceService,
    private location: Location,
    private route: ActivatedRoute
    ) {}

  search(term: string): void {
    this.searchTerms.next(term);
    this.location.replaceState('', '?search=' + encodeURI(term));
  }

  ngOnInit(): void {
    this.halResponse$ = this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => this.performanceService.search(term)),
    );

    this.halResponse$.subscribe(data => {
      if (! data) {
        this.performances = [];

        return;
      }

      this.performances = data._embedded.performance;
    });

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
