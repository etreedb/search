import { Injectable } from '@angular/core';
import { Observable, throwError, of } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { HalLink } from '../schema/hal-link';
import { HalEntityLink } from '../schema/hal-entity-link';

@Injectable({
  providedIn: 'root'
})
export class EntityLinkService {

  constructor(private http: HttpClient) { }

  public loadLink(halLink: HalLink): Observable<HalEntityLink> {
    return this.http.get<HalEntityLink>(halLink.href);
  }
}
