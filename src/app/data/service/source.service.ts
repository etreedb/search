import { Injectable } from '@angular/core';
import { HalSource } from '../schema/hal-source';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { configuration } from '../../application/config/app.config';
import { HalLink } from '../schema/hal-link';
import { Source } from '../schema/source';
import { SourceAudit } from '../schema/source-audit';

@Injectable({
  providedIn: 'root'
})
export class SourceService {

  private apiUrl = configuration.apiUrl;

  constructor(private http: HttpClient) { }

  // Create new performance
  post(postData: any): Observable<any> {
    const headers = new HttpHeaders('Content-type: application/json');
    return this.http.post(`${this.apiUrl}/source`, JSON.stringify(postData), { headers: headers});
  }

  loadLink(halLink: HalLink): Observable<HalSource> {
    return this.http.get<HalSource>(halLink.href);
  }

  search(term: string): Observable<HalSource> {
    return this.http.get<HalSource>(`${this.apiUrl}/source-search?search=${term}`);
  }

  find(id: number): Observable<Source> {
    return this.http.get<Source>(`${this.apiUrl}/source/${id}`);
  }

  audit(halLink: HalLink): Observable<SourceAudit> {
    return this.http.get<SourceAudit>(halLink.href);
  }
}
