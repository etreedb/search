import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { HalLink } from '../app.schema/hal-link';
import { HalEntityLink } from '../app.schema/hal-entity-link';

@Injectable({
  providedIn: 'root'
})
export class FamilyExtendedService {

  constructor(private http: HttpClient) { }

  public loadLink(halLink: HalLink): Observable<HalEntityLink> {
    return this.http.get<HalEntityLink>(halLink.href);
  }
}
