import { Input } from '@angular/core';
import { HalLink } from '../app.schema/hal-link';

export abstract class AbstractHalLinkTable {
  @Input() halResponse: any;
  protected halService: any;

  @Input()
  set halLink(halLink: HalLink) {
    this.loadLink(halLink);
  }

  loadLink(halLink: HalLink): void {
    this.halService.loadLink(halLink)
      .subscribe(halResponse => this.halResponse = halResponse);
  }
}
