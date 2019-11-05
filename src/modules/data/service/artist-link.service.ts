import { Injectable } from '@angular/core';
import { HalArtistLink } from '../schema/hal-artist-link';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HalLink } from '../schema/hal-link';
import { ArtistLink } from '../schema/artist-link';
import { OAuthService } from 'angular-oauth2-oidc';
import { environment } from '@env';

@Injectable({
  providedIn: 'root'
})
export class ArtistLinkService {
  private apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private oauthService: OAuthService
  ) {
    this.apiUrl = environment.apiUrl;
  }

  loadLink(link: HalLink): Observable<HalArtistLink> {
    return this.http.get<HalArtistLink>(`${link.href}`);
  }

  public post(data) {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.oauthService.getAccessToken()
    });
    return this.http.post(`${this.apiUrl}/artist-link`, data, { 'headers': headers});
  }

  public delete(link: ArtistLink) {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.oauthService.getAccessToken()
    });
    return this.http.delete(`${this.apiUrl}/artist-link/${link.id}`, { 'headers': headers});
  }

  public patch(link: ArtistLink, data: object) {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.oauthService.getAccessToken()
    });
    return this.http.patch<ArtistLink>(`${this.apiUrl}/artist-link/${link.id}`, data, { 'headers': headers});
  }
}
