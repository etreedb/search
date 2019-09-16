import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '@env';
import { Observable } from 'rxjs';
import { HalArtist } from '../schema/hal-artist';
import { Artist } from '../schema/artist';
import { HalLink } from '../schema/hal-link';
import { ArtistAudit } from '../schema/artist-audit';
import * as $ from 'jquery';

@Injectable({
  providedIn: 'root'
})
export class ArtistService {
  private apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient
  ) {}

  // Create artist
  public post(postData: any): Observable<any> {
    const headers = new HttpHeaders('Content-type: application/json');
    return this.http.post(`${this.apiUrl}/artist`, JSON.stringify(postData), { headers: headers});
  }

  // Edit artist
  public patch(id: number, postData: any): Observable<any> {
    const headers = new HttpHeaders('Content-type: application/json');
    return this.http.patch(`${this.apiUrl}/artist/${id}`, JSON.stringify(postData), { headers: headers});
  }

  public lookup(term: string): Observable <string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/artist-lookup?search=${term}`);
  }

  public loadLink(halLink: HalLink): Observable<HalArtist> {
    return this.http.get<HalArtist>(halLink.href);
  }

  public audit(halLink: HalLink): Observable<ArtistAudit> {
    return this.http.get<ArtistAudit>(halLink.href);
  }

  public find(id: number): Observable<Artist> {
    return this.http.get<Artist>(`${this.apiUrl}/artist/` + id);
  }

  public searchByLetter(term: string): Observable<HalArtist> {
    const query = {
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

    return this.http.get<HalArtist>(`${this.apiUrl}/artist?` + $.param(query));
  }
}
