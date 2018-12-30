import { Injectable } from '@angular/core';
import { HalPerformance } from '../schema/hal-performance';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { configuration } from '../../application/config/app.config';
import { Performance } from '../schema/performance';
import * as $ from 'jquery';
import { PerformanceAudit } from '../schema/performance-audit';
import { HalLink } from '../schema/hal-link';

@Injectable({
  providedIn: 'root'
})
export class PerformanceService {

  private apiUrl = configuration.apiUrl;

  constructor(private http: HttpClient) { }

  // Create performance
  post(postData: any): Observable<any> {
    const headers = new HttpHeaders('Content-type: application/json');
    return this.http.post(`${this.apiUrl}/performance`, JSON.stringify(postData), { headers: headers});
  }

  // Edit performance
  patch(id: number, patchData: any): Observable<any> {
    const headers = new HttpHeaders('Content-type: application/json');
    return this.http.patch(`${this.apiUrl}/performance/${id}`, JSON.stringify(patchData), { headers: headers});
  }

  loadLink(halLink: HalLink): Observable<HalPerformance> {
    return this.http.get<HalPerformance>(halLink.href);
  }

  audit(halLink: HalLink): Observable<PerformanceAudit> {
    return this.http.get<PerformanceAudit>(halLink.href);
  }

  search(term: string): Observable<HalPerformance> {
    return this.http.get<HalPerformance>(`${this.apiUrl}/performance-search?search=${term}`);
  }

  lookup(name: string, performanceDate: string): Observable<HalPerformance> {
    return this.http.get<HalPerformance>(`${this.apiUrl}/performance?name=${name}&performanceDate=${performanceDate}`);
  }

  find(id: number): Observable<Performance> {
    return this.http.get<Performance>(`${this.apiUrl}/performance/${id}`);
  }

  findByYear(artistId: number, year: number): Observable<HalPerformance> {
    const params = {
      filter: [
        {
          type: 'innerjoin',
          field: 'artist',
          alias: 'artist'
        },
        {
          type: 'eq',
          field: 'id',
          alias: 'artist',
          value: artistId
        },
        {
          type: 'eq',
          field: 'year',
          value: year
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

    return this.http.get<HalPerformance>(`${this.apiUrl}/performance?` + $.param(params));
  }
}
