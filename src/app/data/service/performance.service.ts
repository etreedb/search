import { Injectable } from '@angular/core';
import { HalPerformance } from '../schema/hal-performance';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { configuration } from '../../application/config/app.config';
import { Performance } from '../schema/performance';
import * as $ from 'jquery';
import { PerformanceAudit } from '../schema/performance-audit';
import { HalLink } from '../schema/hal-link';
import { map } from 'rxjs/operators';
import { plainToClass } from 'class-transformer';

@Injectable({
  providedIn: 'root'
})
export class PerformanceService {

  private apiUrl = configuration.apiUrl;

  constructor(private http: HttpClient) { }

  // Create performance
  post(postData: any): Observable<Performance> {
    const headers = new HttpHeaders('Content-type: application/json');
    return this.http.post<Performance>(`${this.apiUrl}/performance`, JSON.stringify(postData), { headers: headers})
      .pipe(
        map( performance => plainToClass(Performance, performance))
      );
}

  // Edit performance
  patch(id: number, patchData: any): Observable<Performance> {
    const headers = new HttpHeaders('Content-type: application/json');
    return this.http.patch<Performance>(`${this.apiUrl}/performance/${id}`, JSON.stringify(patchData), { headers: headers})
      .pipe(
        map( performance => plainToClass(Performance, performance))
      );
  }

  loadLink(halLink: HalLink): Observable<HalPerformance> {
    return this.http.get<HalPerformance>(halLink.href)
      .pipe(
        map( halPerformance => {
          halPerformance._embedded.performance.forEach( performance => {
            performance = plainToClass(Performance, performance);
          });

          return halPerformance;
        })
      );
  }

  audit(halLink: HalLink): Observable<PerformanceAudit> {
    return this.http.get<PerformanceAudit>(halLink.href);
  }

  search(query: any): Observable<HalPerformance> {
    const params = $.param(query);
    return this.http.get<HalPerformance>(`${this.apiUrl}/performance-search?${params}`)
    .pipe(
      map( halPerformance => {
        const performances = [];
        halPerformance._embedded.performance.forEach( performance => {
          performances.push(plainToClass(Performance, performance));
        });
        halPerformance._embedded.performance = performances;

        return halPerformance;
      })
    );
  }

  lookup(name: string, performanceDate: string): Observable<HalPerformance> {
    return this.http.get<HalPerformance>(`${this.apiUrl}/performance?name=${name}&performanceDate=${performanceDate}`)
    .pipe(
      map( halPerformance => {
        const performances = [];
        halPerformance._embedded.performance.forEach( performance => {
          performances.push(plainToClass(Performance, performance));
        });
        halPerformance._embedded.performance = performances;

        return halPerformance;
      })
    );
  }

  find(id: number): Observable<Performance> {
    return this.http.get<Performance>(`${this.apiUrl}/performance/${id}`)
      .pipe(
        map( performance => plainToClass(Performance, performance))
      );
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

    return this.http.get<HalPerformance>(`${this.apiUrl}/performance?` + $.param(params))
      .pipe(
        map( halPerformance => {
          const performances = [];
          halPerformance._embedded.performance.forEach( performance => {
            performances.push(plainToClass(Performance, performance));
          });
          halPerformance._embedded.performance = performances;

          return halPerformance;
        })
      );
  }
}
