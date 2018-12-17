import { Injectable } from '@angular/core';
import { HalSource } from './hal-source';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { apiUrl } from './app.component';
import { HalLink } from './hal-link';
import { Source } from './source';
import { SourceAudit } from './source-audit';

@Injectable({
  providedIn: 'root'
})
export class SourceService {

  private apiUrl = apiUrl;

  constructor(private http: HttpClient) { }

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
