import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env';
import { Observable } from 'rxjs';
import { HalShnFlacArtist } from '../schema/hal-shn-flac-artist';
import { ShnFlacArtist } from '../schema/shn-flac-artist';
import { HalLink } from '../schema/hal-link';
import * as $ from 'jquery';

@Injectable({
  providedIn: 'root'
})
export class ShnFlacArtistService {
  private apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient
  ) {}

  public lookup(term: string): Observable <string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/shn-flac-artist-lookup?search=${term}`);
  }

  public loadLink(halLink: HalLink): Observable<HalShnFlacArtist> {
    return this.http.get<HalShnFlacArtist>(halLink.href);
  }

  public find(id: number): Observable<ShnFlacArtist> {
    return this.http.get<ShnFlacArtist>(`${this.apiUrl}/shn-flac-artist/` + id);
  }

  public searchByLetter(term: string): Observable<HalShnFlacArtist> {
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
      'limit': 25
    };

    return this.http.get<HalShnFlacArtist>(`${this.apiUrl}/shn-flac-artist?` + $.param(query));
  }
}
