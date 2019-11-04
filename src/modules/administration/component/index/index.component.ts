import { Component } from '@angular/core';
import { HalLink } from '@modules/data/schema/hal-link';
import { environment } from '@env';
import * as $ from 'jquery';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent {
  public artistLink: HalLink;
  public artistLinkLink: HalLink; // artistLink = entity, Link is HalLink
  public performanceLink: HalLink;
  public sourceLink: HalLink;

  constructor() {
    const artistQueryParams: any = {
      'order-by': [
        {
          field: 'createdAt',
          type: 'field',
          direction: 'desc'
        }
      ]
    };
    this.artistLink = {
      href: environment.apiUrl + '/artist?' + $.param(artistQueryParams)
    };

    const performanceQueryParams: any = {
      'order-by': [
        {
          field: 'createdAt',
          type: 'field',
          direction: 'desc'
        }
      ]
    };
    this.performanceLink = {
      href: environment.apiUrl + '/performance?' + $.param(performanceQueryParams)
    };

    const sourceQueryParams: any = {
      'order-by': [
        {
          field: 'createdAt',
          type: 'field',
          direction: 'desc'
        }
      ]
    };
    this.sourceLink = {
      href: environment.apiUrl + '/source?' + $.param(sourceQueryParams)
    };

    const artistLinkQueryParams: any = {
      'order-by': [
        {
          field: 'id',
          type: 'field',
          direction: 'desc'
        }
      ]
    };
    this.artistLinkLink = {
      href: environment.apiUrl + '/artist-link?' + $.param(artistLinkQueryParams)
    };

    console.log(this.artistLinkLink);
  }
}
