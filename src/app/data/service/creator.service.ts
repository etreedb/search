import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HalLink } from '../schema/hal-link';
import { HalCreator } from '../schema/hal-creator';
import { configuration } from '../../application/config/app.config';
import * as $ from 'jquery';
import { Creator } from '../schema/creator';

@Injectable({
  providedIn: 'root'
})
export class CreatorService {
  private apiUrl = configuration.apiUrl;

  constructor(private http: HttpClient) { }

  loadLink(halLink: HalLink): Observable<HalCreator> {
    return this.http.get<HalCreator>(halLink.href);
  }

  public query(param: object) {
    return this.http.get<HalCreator>(`${this.apiUrl}/internet-archive/identifier?` + $.param(param));
  }

  find(id: number): Observable<Creator> {
    return this.http.get<Creator>(`${this.apiUrl}/internet-archive/creator/` + id);
  }
  searchByLetter(term: string): Observable<HalCreator> {
    const params = {
      filter: [
        {
          type: 'like',
          field: 'name',
          value: term + '%'
        }
      ],
      'order-by': [
        {
          type: 'field',
          field: 'name',
          direction: 'asc'
        }
      ],
      'limit': 99
    };

    return this.http.get<HalCreator>(`${this.apiUrl}/internet-archive/creator?` + $.param(params));
  }
}
