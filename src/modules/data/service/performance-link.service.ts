import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HalLink } from '../schema/hal-link';
import { HalEntityLink } from '../schema/hal-entity-link';
import { OAuthService } from 'angular-oauth2-oidc';
import { environment } from '@env';
import { PerformanceLink } from '../schema/performance-link';

@Injectable({
  providedIn: 'root'
})
export class PerformanceLinkService {
  private apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private oauthService: OAuthService
  ) { }

  loadLink(link: HalLink): Observable<HalEntityLink> {
    return this.http.get<HalEntityLink>(`${link.href}`);
  }

  public post(data) {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.oauthService.getAccessToken()
    });
    return this.http.post(`${this.apiUrl}/performance-link`, data, { 'headers': headers});
  }

  public delete(link: PerformanceLink) {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.oauthService.getAccessToken()
    });
    return this.http.delete(`${this.apiUrl}/performance-link/${link.id}`, { 'headers': headers});
  }

  public patch(link: PerformanceLink, data: object) {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.oauthService.getAccessToken()
    });
    return this.http.patch<PerformanceLink>(`${this.apiUrl}/performance-link/${link.id}`, data, { 'headers': headers});
  }
}
