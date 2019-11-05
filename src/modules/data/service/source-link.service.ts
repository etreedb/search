import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HalLink } from '../schema/hal-link';
import { HalEntityLink } from '../schema/hal-entity-link';
import { OAuthService } from 'angular-oauth2-oidc';
import { environment } from '@env';
import { SourceLink } from '../schema/source-link';

@Injectable({
  providedIn: 'root'
})
export class SourceLinkService {
  private apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private oauthService: OAuthService
  ) { }

  loadLink(halLink: HalLink): Observable<HalEntityLink> {
    return this.http.get<HalEntityLink>(halLink.href);
  }

  public post(data) {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.oauthService.getAccessToken()
    });
    return this.http.post(`${this.apiUrl}/source-link`, data, { 'headers': headers});
  }

  public delete(link: SourceLink) {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.oauthService.getAccessToken()
    });
    return this.http.delete(`${this.apiUrl}/source-link/${link.id}`, { 'headers': headers});
  }

  public patch(link: SourceLink, data: object) {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.oauthService.getAccessToken()
    });
    return this.http.patch<SourceLink>(`${this.apiUrl}/source-link/${link.id}`, data, { 'headers': headers});
  }
}
