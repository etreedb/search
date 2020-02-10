import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HalLink } from '../schema/hal-link';
import { HalSourceChecksum } from '../schema/hal-source-checksum';
import { HalSource } from '../schema/hal-source';
import { environment } from '@env';
import * as $ from 'jquery';

@Injectable({
  providedIn: 'root'
})
export class SourceChecksumService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  public loadLink(halLink: HalLink): Observable<HalSourceChecksum> {
    return this.http.get<HalSourceChecksum>(halLink.href);
  }

  public search(term: string): Observable<HalSource> {
    const query = {
      filter: [
        {
          type: 'innerjoin',
          field: 'performance',
          alias: 'performance'
        },
        {
          parentAlias: 'performance',
          type: 'innerjoin',
          field: 'artist',
          alias: 'artist'
        },
        {
          type: 'innerjoin',
          field: 'sourceChecksum',
          alias: 'sourceChecksum'
        },
        {
          alias: 'sourceChecksum',
          type: 'like',
          field: 'description',
          value: '%' + term + '%',
        }
      ],
      'order-by': [
        {
          alias: 'artist',
          type: 'field',
          field: 'name',
          direction: 'asc'
        },
        {
          alias: 'performance',
          type: 'field',
          field: 'performanceDate',
          direction: 'asc'
        }
      ]
    };

    const params = $.param(query);
    return this.http.get<HalSource>(`${this.apiUrl}/source?${params}`);
  }
}
