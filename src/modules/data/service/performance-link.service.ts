import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HalLink } from '../schema/hal-link';
import { HalEntityLink } from '../schema/hal-entity-link';

@Injectable({
  providedIn: 'root'
})
export class PerformanceLinkService {

  constructor(private http: HttpClient) { }

  loadLink(link: HalLink): Observable<HalEntityLink> {
    return this.http.get<HalEntityLink>(`${link.href}`);
  }
}
