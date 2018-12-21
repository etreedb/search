import { Injectable } from '@angular/core';
import { HalArtistLink } from '../schema/hal-artist-link';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HalLink } from '../schema/hal-link';

@Injectable({
  providedIn: 'root'
})
export class ArtistLinkService {

  constructor(private http: HttpClient) { }

  loadLink(link: HalLink): Observable<HalArtistLink> {
    return this.http.get<HalArtistLink>(`${link.href}`);
  }
}
