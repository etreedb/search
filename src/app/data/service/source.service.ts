import { Injectable } from '@angular/core';
import { HalSource } from '../schema/hal-source';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { apiUrl } from '../../application/config/app.config';
import { HalLink } from '../schema/hal-link';
import { Source } from '../schema/source';
import { SourceAudit } from '../schema/source-audit';

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
