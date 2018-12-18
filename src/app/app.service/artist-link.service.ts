import { Injectable } from '@angular/core';
import { HalArtistLink } from '../app.schema/hal-artist-link';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { HalLink } from '../app.schema/hal-link';

@Injectable({
  providedIn: 'root'
})
export class ArtistLinkService {

  constructor(private http: HttpClient) { }

  loadLink(link: HalLink): Observable<HalArtistLink> {
    return this.http.get<HalArtistLink>(`${link.href}`);
  }
}
