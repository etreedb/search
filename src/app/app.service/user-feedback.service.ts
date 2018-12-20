import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HalLink } from '../app.schema/hal-link';
import { HalEntityLink } from '../app.schema/hal-entity-link';

@Injectable({
  providedIn: 'root'
})
export class UserFeedbackService {
  constructor(private http: HttpClient) { }

  loadLink(link: HalLink): Observable<HalEntityLink> {
    return this.http.get<HalEntityLink>(`${link.href}`);
  }
}
