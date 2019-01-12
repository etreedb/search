import { Injectable } from '@angular/core';
import { HalSource } from '../schema/hal-source';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { configuration } from '../../application/config/app.config';
import { HalLink } from '../schema/hal-link';
import { Source } from '../schema/source';
import { SourceAudit } from '../schema/source-audit';
import { map } from 'rxjs/operators';
import { plainToClass } from 'class-transformer';
import * as $ from 'jquery';

@Injectable({
  providedIn: 'root'
})
export class SourceService {

  private apiUrl = configuration.apiUrl;

  constructor(private http: HttpClient) { }

  // Update source
  patch(id: number, patchData: any): Observable<any> {
    const headers = new HttpHeaders('Content-type: application/json');
    return this.http.patch(`${this.apiUrl}/source/${id}`, JSON.stringify(patchData), { headers: headers});
  }

  // Create source
  post(postData: any): Observable<any> {
    const headers = new HttpHeaders('Content-type: application/json');
    return this.http.post(`${this.apiUrl}/source`, JSON.stringify(postData), { headers: headers});
  }

  loadLink(halLink: HalLink): Observable<HalSource> {
    return this.http.get<HalSource>(halLink.href);
  }

  search(query: any): Observable<HalSource> {
    const params = $.param(query);
    return this.http.get<HalSource>(`${this.apiUrl}/source-search?${params}`)
      .pipe(
        map( halSource => plainToClass(HalSource, halSource))
      );
  }

  find(id: number): Observable<Source> {
    return this.http.get<Source>(`${this.apiUrl}/source/${id}`);
  }

  audit(halLink: HalLink): Observable<SourceAudit> {
    return this.http.get<SourceAudit>(halLink.href);
  }
}
