import { Injectable } from '@angular/core';
import { HalPerformance } from './hal-performance';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PerformanceService {

  private apiUrl = 'https://api.etreedb.org/performance-search';

  constructor(private http: HttpClient) { }

  search(term: string): Observable<HalPerformance> {
    if (! term.trim()) {
//      return of();
    }

    return this.http.get<HalPerformance>(`${this.apiUrl}?search=${term}`);
  }
}
