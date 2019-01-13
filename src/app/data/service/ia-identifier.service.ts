import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HalLink } from '../schema/hal-link';
import { HalIaIdentifier } from '../schema/hal-ia-identifier';
import { configuration } from '../../application/config/app.config';
import * as $ from 'jquery';

@Injectable({
  providedIn: 'root'
})
export class IaIdentifierService {
  private apiUrl = configuration.apiUrl;

  constructor(private http: HttpClient) { }

  loadLink(halLink: HalLink): Observable<HalIaIdentifier> {
    return this.http.get<HalIaIdentifier>(halLink.href);
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

    return this.http.get<HalIaIdentifier>(`${this.apiUrl}/internet-archive/identifier?` + $.param(params));
  }
}
