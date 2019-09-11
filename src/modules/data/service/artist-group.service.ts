import { Injectable } from '@angular/core';
import { User } from '../schema/user';
import { Observable } from 'rxjs';
import { environment } from '@env';
import { HalArtistGroup } from '../schema/hal-artist-group';
import { HttpClient } from '@angular/common/http';
import * as $ from 'jquery';

@Injectable({
  providedIn: 'root'
})
export class ArtistGroupService {
  private apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient
  ) { }

  findByUser(user: User): Observable<HalArtistGroup> {
    const params = {
      filter: [
        {
          type: 'ismemberof',
          field: 'user',
          value: user.id
        }
      ],
      'order-by': [
        {
          type: 'field',
          field: 'title',
          direction: 'asc'
        }
      ],
      'limit': 99
    };

    return this.http.get<HalArtistGroup>(`${this.apiUrl}/artist-group?` + $.param(params));
  }
}
