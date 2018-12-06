import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Source } from '../source';
import { ActivatedRoute } from '@angular/router';
import { SourceService } from '../source.service';

@Component({
  selector: 'app-source-search',
  templateUrl: './source-search.component.html',
  styleUrls: ['./source-search.component.css']
})
export class SourceSearchComponent implements OnInit {
  sources: Array<Source>;
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
    private sourceService: SourceService,
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

    this.sources.sort(function(a, b) {
      switch (field) {
        case 'performanceDate':
        if (a._embedded.performance.performanceDate < b._embedded.performance.performanceDate) {
          return -1 * modifier;
        }
        if (b._embedded.performance.performanceDate < a._embedded.performance.performanceDate) {
          return 1 * modifier;
        }
        break;
      case 'summary':
      case 'id':
          if (a[field] < b[field]) {
            return -1 * modifier;
          }
          if (b[field] < a[field]) {
            return 1 * modifier;
          }
          break;
        case 'name':
          if (a._embedded.performance._embedded.artist.name < b._embedded.performance._embedded.artist.name) {
            return -1 * modifier;
          }
          if (b._embedded.performance._embedded.artist.name < a._embedded.performance._embedded.artist.name) {
            return 1 * modifier;
          }
      }

      return 0;
    });
  }

  clearSearch(): void {
    this.showSpinner = false;
    this.showInstructions = true;
    this.sources = [];
    this.links = false;
    this.location.replaceState('source/search');
  }

  search(term: string): void {
    if (! term) {
      return;
    }

    this.showSpinner = true;
    this.showInstructions = false;
    this.location.replaceState('source/search', '?search=' + encodeURI(term));
    this.sourceService.search(term).subscribe(data => {
      this.page = {
        current: data.page,
        count: data.page_count
      };

      this.sources = data._embedded.source;
      this.links = data._links;
      this.showSpinner = false;
    });
  }

  loadUrl(url: string): void {
    this.showSpinner = true;
    this.showInstructions = false;
    this.sourceService.loadUrl(url).subscribe(data => {
      this.page = {
        current: data.page,
        count: data.page_count
      };

      this.sources = data._embedded.source;
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
