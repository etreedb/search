import { Injectable } from '@angular/core';
import { User } from '../schema/user';
import { Observable } from 'rxjs';
import { environment } from '@env';
import { HalArtistGroup } from '../schema/hal-artist-group';
import { HttpClient } from '@angular/common/http';
import * as $ from 'jquery';
import { switchMap, map } from 'rxjs/operators';
import { Artist } from '../schema/artist';
import { ArtistGroup } from '../schema/artist-group';
import { Memoize } from '../decorator/memoize';

@Injectable({
  providedIn: 'root'
})
export class ArtistGroupService {
  private apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient
  ) { }

  findByUrl(url: string): Observable<HalArtistGroup> {
    return this.http.get<HalArtistGroup>(url);
  }

  @Memoize()
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

    return this.http.get<HalArtistGroup>(`${this.apiUrl}/artist-group?` + $.param(params)).pipe(
      // Sort embedded artists by name
      map(data => {
        data._embedded.artist_group.forEach((artistGroup: ArtistGroup, index: number) => {
          artistGroup._embedded.artist.sort((a: Artist, b: Artist) => {
            if (a.name === b.name) {
              return 0;
            }

            return (a.name > b.name) ? 1 : -1;
          });

          data._embedded.artist_group[index] = artistGroup;
        });

        return data;
      })
    );
  }
}
