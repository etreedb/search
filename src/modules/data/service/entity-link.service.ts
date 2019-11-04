import { Injectable } from '@angular/core';
import { Observable, throwError, of } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { HalLink } from '../schema/hal-link';
import { HalEntityLink } from '../schema/hal-entity-link';
import { LinkInterface } from '../schema/link-interface';
import { environment } from '@env';
import { OAuthService } from 'angular-oauth2-oidc';

@Injectable({
  providedIn: 'root'
})
export class EntityLinkService {
  protected apiUrl: string;

  constructor(
    protected http: HttpClient,
    private oauthService: OAuthService
  ) {
    this.apiUrl = environment.apiUrl;
  }

  public loadLink(halLink: HalLink): Observable<HalEntityLink> {
    return this.http.get<HalEntityLink>(halLink.href);
  }

  public delete(linkType: string, link: LinkInterface) {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.oauthService.getAccessToken()
    });
    return this.http.delete(`${this.apiUrl}/${linkType}/${link.id}`, { 'headers': headers});
  }

  public patch(linkType: string, link: LinkInterface, data: object) {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.oauthService.getAccessToken()
    });
    return this.http.patch<LinkInterface>(`${this.apiUrl}/${linkType}/${link.id}`, data, { 'headers': headers});
  }
}
