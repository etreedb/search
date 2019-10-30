import { Component, Input } from '@angular/core';
import { PerformanceImageService } from '@modules/data/service/performance-image.service';
import { EntityLinkService } from '@data/service/entity-link.service';
import { AbstractHalLinkTable } from '../abstract-hal-link-table';
import { Performance } from '@modules/data/schema/performance';

@Component({
  selector: 'app-performance-image-table',
  templateUrl: './performance-image-table.component.html',
  styleUrls: ['./performance-image-table.component.css']
})
export class PerformanceImageTableComponent extends AbstractHalLinkTable {

  constructor(
    protected halService: PerformanceImageService
  ) {
    super();
  }

  @Input()
  performance: Performance;

  getLinks(): void {
    return this.halResponse._embedded['performance_image'];
  }
}
