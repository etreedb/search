import { Input } from '@angular/core';
import { HalLink } from '../../data/schema/hal-link';
import * as $ from 'jquery';

export abstract class AbstractHalLinkTable {
  protected halService: any;
  protected queryParams: any;
  public flag = false;

  @Input()
  halResponse: any;

  @Input()
  title: string;

  @Input()
  halLink: HalLink;

  toggleFlag() {
    this.flag = ! this.flag;
    if (this.flag && ! this.halResponse) {
      this.loadLink();
    }
  }


  /**
   * You may include additonal query params which are always ran.
   */
  /*
  protected queryParams: any = {
      filter: [
      {
        field: 'venue',
        type: 'eq',
        value: 'E Center'
      }
    ]
  };
*/

  loadLink(): void {
    const halLink = this.halLink;
    if (this.queryParams) {
      // Move halLink query param onto this.queryParams
      const a: any = $('<a>', { href: halLink.href } )[0];
      const search = decodeURIComponent(a.search.substring(1));
      const flatArray = JSON.parse('{"' + decodeURI(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}');

      // Combine this.queryParams with halQueryParams
      if (Object.keys(flatArray).length === 3) {
        this.queryParams.filter.push({
          field: flatArray['filter[0][field]'],
          type: flatArray['filter[0][type]'],
          value: flatArray['filter[0][value]']
        });

        // Change the halLink based on original url + halQueryParams + queryParams
        halLink.href = a.protocol + '//' + a.host + a.pathname + '?' + $.param(this.queryParams);
      }
    }

    this.halService.loadLink(halLink)
      .subscribe(halResponse => this.halResponse = halResponse);
  }
}
