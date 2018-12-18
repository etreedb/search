import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { HalLink } from './hal-link';
import { HalEntityLink } from './hal-entity-link';

@Injectable({
  providedIn: 'root'
})
export class PerformanceLinkService {

  constructor(private http: HttpClient) { }

  loadLink(link: HalLink): Observable<HalEntityLink> {
    return this.http.get<HalEntityLink>(`${link.href}`);
  }
}
