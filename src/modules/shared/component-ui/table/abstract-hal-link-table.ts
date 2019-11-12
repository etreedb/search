import { Input, OnInit } from '@angular/core';
import { HalLink } from '@data/schema/hal-link';
import * as $ from 'jquery';
import { Subject, Observable, BehaviorSubject } from 'rxjs';

export abstract class AbstractHalLinkTable implements OnInit {
  protected halService: any;
  protected queryParams: any;
  public flag$: Subject<boolean>;

  @Input()
  halResponse: any;

  @Input()
  title: string;

  @Input()
  halLink: HalLink;

  @Input()
  flag = false;

  @Input()
  reloadLink$: BehaviorSubject<boolean>;

  public ngOnInit() {
    if (this.reloadLink$) {
      this.reloadLink$.subscribe(value => {
        if (value) {
          this.loadLink();
        }
      });
    }

    if (this.flag) {
      this.flag$.next(this.flag);

      if (this.flag && ! this.halResponse) {
        this.loadLink();
      }
    }
  }

  toggleFlag() {
    this.flag = ! this.flag;
    this.flag$.next(this.flag);

    if (this.flag && ! this.halResponse) {
      this.loadLink();
    }
  }

  constructor() {
    this.flag$ = new Subject();
  }

  public loadLink(newLink?: HalLink): void {
    if (this.reloadLink$) {
      this.reloadLink$.next(false);
    }

    if (newLink) {
      this.halLink = newLink;
    }
    const halLink = this.halLink;

    if (! halLink) {
      return;
    }

    if (this.queryParams) {
      // Move halLink query param onto this.queryParams
      const a: any = $('<a>', { href: halLink.href } )[0];
      const search = decodeURIComponent(a.search.substring(1));
      console.log(a.search);
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
