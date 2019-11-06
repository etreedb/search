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
  public performanceImageLink: HalLink;
  public performanceLinkLink: HalLink;
  public sourceLink: HalLink;
  public sourceLinkLink: HalLink;

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

    const performanceLinkQueryParams: any = {
      'order-by': [
        {
          field: 'id',
          type: 'field',
          direction: 'desc'
        }
      ]
    };
    this.performanceLinkLink = {
      href: environment.apiUrl + '/performance-link?' + $.param(performanceLinkQueryParams)
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


    const sourceLinkQueryParams: any = {
      'order-by': [
        {
          field: 'id',
          type: 'field',
          direction: 'desc'
        }
      ]
    };
    this.sourceLinkLink = {
      href: environment.apiUrl + '/source-link?' + $.param(sourceLinkQueryParams)
    };

    const performanceImageQueryParams: any = {
      'order-by': [
        {
          field: 'id',
          type: 'field',
          direction: 'desc'
        }
      ]
    };
    this.performanceImageLink = {
      href: environment.apiUrl + '/performance-image?' + $.param(performanceImageQueryParams)
    };


  }
}
