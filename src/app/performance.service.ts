import { Injectable } from '@angular/core';
import { HalPerformance } from './hal-performance';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { apiUrl } from './app.component';

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
}
