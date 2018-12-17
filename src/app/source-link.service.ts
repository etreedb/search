import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { HalLink } from './hal-link';
import { HalSourceLink } from './hal-source-link';

@Injectable({
  providedIn: 'root'
})
export class SourceLinkService {
  constructor(private http: HttpClient) { }

  loadLink(halLink: HalLink): Observable<HalSourceLink> {
    return this.http.get<HalSourceLink>(halLink.href);
  }
}
