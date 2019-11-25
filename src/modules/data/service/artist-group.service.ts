import { Injectable } from '@angular/core';
import { User } from '../schema/user';
import { Observable } from 'rxjs';
import { environment } from '@env';
import { HalArtistGroup } from '../schema/hal-artist-group';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as $ from 'jquery';
import { map } from 'rxjs/operators';
import { Artist } from '../schema/artist';
import { ArtistGroup } from '../schema/artist-group';
import { HalLink } from '../schema/hal-link';

@Injectable({
  providedIn: 'root'
})
export class ArtistGroupService {
  private apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient
  ) { }

  // Edit artist
  public patch(id: number, postData: any): Observable<any> {
    const headers = new HttpHeaders('Content-type: application/json');
    return this.http.patch(`${this.apiUrl}/artist-group/${id}`, JSON.stringify(postData), { headers: headers});
  }

  public loadLink(halLink: HalLink): Observable<HalArtistGroup> {
    return this.http.get<HalArtistGroup>(halLink.href);
  }

  public find(id: number): Observable<ArtistGroup> {
    return this.http.get<ArtistGroup>(`${this.apiUrl}/artist-group/${id}`);
  }

  public findBy(query: any): Observable<HalArtistGroup> {
    const params = $.param(query);
    return this.http.get<HalArtistGroup>(`${this.apiUrl}/artist-group?${params}`);
  }

  public findByUrl(url: string): Observable<HalArtistGroup> {
    return this.http.get<HalArtistGroup>(url);
  }

  public findByUser(user: User): Observable<HalArtistGroup> {
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
