import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { apiUrl } from './app.component';
import { Observable, throwError, of } from 'rxjs';
import { HalArtist } from './hal-artist';
import { Artist } from './artist';
import * as $ from 'jquery';

@Injectable({
  providedIn: 'root'
})
export class ArtistService {
  private apiUrl = apiUrl;

  constructor(private http: HttpClient) { }

  lookup(term: string): Observable <string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/artist-lookup?search=${term}`);
  }

  loadUrl(url: string): Observable<HalArtist> {
    return this.http.get<HalArtist>(`${url}`);
  }

  find(id: number): Observable<Artist> {
    return this.http.get<Artist>(`${this.apiUrl}/artist/` + id);
  }

  searchByLetter(term: string): Observable<HalArtist> {
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

    return this.http.get<HalArtist>(`${this.apiUrl}/artist?` + $.param(params));
  }
}
