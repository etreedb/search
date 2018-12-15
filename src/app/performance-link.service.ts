import { Injectable } from '@angular/core';
import { HalPerformanceLink } from './hal-performance-link';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { HalLink } from './hal-link';

@Injectable({
  providedIn: 'root'
})
export class PerformanceLinkService {

  constructor(private http: HttpClient) { }

  loadLink(link: HalLink): Observable<HalPerformanceLink> {
    return this.http.get<HalPerformanceLink>(`${link.href}`);
  }
}
