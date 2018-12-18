import { Component, OnInit, Input } from '@angular/core';
import { HalSource } from '../../hal-source';
import { HalLink } from '../../hal-link';
import { SourceService } from '../../source.service';

@Component({
  selector: 'app-source-table',
  templateUrl: './source-table.component.html',
  styleUrls: ['./source-table.component.css']
})
export class SourceTableComponent implements OnInit {
  private lastSortField: string;

  constructor(
    private sourceService: SourceService
  ) { }

  @Input() halSource: HalSource;

  @Input()
  set halLink(halLink: HalLink) {
    this.loadLink(halLink);
  }

  loadLink(halLink: HalLink) {
    this.sourceService.loadLink(halLink)
      .subscribe(halSource => this.halSource = halSource);
  }

  ngOnInit() {
  }

  sort(field: string): void {
    let modifier = 1;
    if (this.lastSortField === field) {
      modifier = -1;
      this.lastSortField = '';
    } else {
      this.lastSortField = field;
    }

    this.halSource._embedded.source.sort(function(a, b) {
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
}
