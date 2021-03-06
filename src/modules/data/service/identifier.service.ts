import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HalLink } from '../schema/hal-link';
import { HalIdentifier } from '../schema/hal-identifier';
import { environment } from '@env';
import * as $ from 'jquery';

@Injectable({
  providedIn: 'root'
})
export class IdentifierService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  loadLink(halLink: HalLink): Observable<HalIdentifier> {
    return this.http.get<HalIdentifier>(halLink.href);
  }

  public query(param: object) {
    return this.http.get<HalIdentifier>(`${this.apiUrl}/internet-archive/identifier?` + $.param(param));
  }

  public findByCreatorAndPerformanceDate(creator: string, performanceDate: string) {
    const params = {
      filter: [
        {
          type: 'innerJoin',
          field: 'creator',
          alias: 'creator'
        },
        {
          type: 'eq',
          field: 'name',
          alias: 'creator',
          value: creator
        },
        {
          type: 'eq',
          field: 'performanceDate',
          value: performanceDate
        }
      ]
    };

    return this.http.get<HalIdentifier>(`${this.apiUrl}/internet-archive/identifier?` + $.param(params));
  }

  findByYear(creatorId: number, year: number): Observable<HalIdentifier> {
    const params: any = {
      filter: [
        {
          type: 'innerjoin',
          field: 'creator',
          alias: 'creator'
        },
        {
          type: 'eq',
          field: 'id',
          alias: 'creator',
          value: creatorId
        }
      ],
      'order-by': [
        {
          type: 'field',
          field: 'performanceDate',
          direction: 'asc'
        }
      ]
    };

    if (year > 0) {
      params.filter.push({
        type: 'eq',
        field: 'year',
        value: +year
      });
    } else {
      params.filter.push({
        type: 'isnull',
        field: 'year'
      });
    }

    return this.http.get<HalIdentifier>(`${this.apiUrl}/internet-archive/identifier?` + $.param(params));
  }

}
