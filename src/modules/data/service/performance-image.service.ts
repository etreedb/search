import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HalLink } from '../schema/hal-link';
import { HalEntityLink } from '../schema/hal-entity-link';
import { environment } from '@env';
import { OAuthService } from 'angular-oauth2-oidc';
import { PerformanceImage } from '../schema/performance-image';

@Injectable({
  providedIn: 'root'
})
export class PerformanceImageService {
  private apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private oauthService: OAuthService
  ) { }

  public loadLink(halLink: HalLink): Observable<HalEntityLink> {
    return this.http.get<HalEntityLink>(halLink.href);
  }

  public uploadFile(formData: FormData) {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.oauthService.getAccessToken()
    });
    return this.http.post<PerformanceImage>(`${this.apiUrl}/performance-image`, formData, {'headers': headers});
  }

  public delete(performanceImage: PerformanceImage) {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.oauthService.getAccessToken()
    });
    return this.http.delete(`${this.apiUrl}/performance-image/${performanceImage.id}`, { 'headers': headers});
  }

  public patch(performanceImage: PerformanceImage, data: object) {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.oauthService.getAccessToken()
    });
    return this.http.patch<PerformanceImage>(`${this.apiUrl}/performance-image/${performanceImage.id}`, data, { 'headers': headers});
  }
}
