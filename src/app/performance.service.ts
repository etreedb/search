import { Injectable } from '@angular/core';
import { HalPerformance } from './hal-performance';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { apiUrl } from './app.component';
import * as $ from 'jquery';

@Injectable({
  providedIn: 'root'
})
export class PerformanceService {

  private apiUrl = apiUrl;

  constructor(private http: HttpClient) { }

  loadUrl(url: string): Observable<HalPerformance> {
    return this.http.get<HalPerformance>(`${url}`);
  }

  search(term: string): Observable<HalPerformance> {
    return this.http.get<HalPerformance>(`${this.apiUrl}/performance-search?search=${term}`);
  }

  lookup(name: string, performanceDate: string): Observable<HalPerformance> {
    return this.http.get<HalPerformance>(`${this.apiUrl}/performance?name=${name}&performanceDate=${performanceDate}`);
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
