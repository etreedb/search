import { Component, OnInit, Input } from '@angular/core';
import { HalPerformance } from '../../hal-performance';
import { HalLink } from '../../hal-link';
import { PerformanceService } from '../../performance.service';

@Component({
  selector: 'app-performance-table',
  templateUrl: './performance-table.component.html',
  styleUrls: ['./performance-table.component.css']
})
export class PerformanceTableComponent implements OnInit {
  @Input() halPerformance: HalPerformance;
  private lastSortField: string;

  constructor(
    private performanceService: PerformanceService
  ) { }

  ngOnInit() {
  }

  loadLink(halLink: HalLink): void {
    this.performanceService.loadLink(halLink)
      .subscribe(halPerformance => this.halPerformance = halPerformance);
  }

  sort(field: string): void {
    let modifier = 1;
    if (this.lastSortField === field) {
      modifier = -1;
      this.lastSortField = '';
    } else {
      this.lastSortField = field;
    }

    this.halPerformance._embedded.performance.sort(function(a, b) {
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
}
