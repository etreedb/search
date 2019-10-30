import { Component } from '@angular/core';
import { PerformanceImageService } from '@modules/data/service/performance-image.service';
import { EntityLinkService } from '@data/service/entity-link.service';
import { AbstractHalLinkTable } from '../abstract-hal-link-table';

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

  getLinks(): void {
    console.log(this.halResponse());
    return this.halResponse._embedded['performance_image'];
  }
}
