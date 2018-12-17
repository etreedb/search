import { Injectable } from '@angular/core';
import { HalSource } from './hal-source';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { apiUrl } from './app.component';
import { HalLink } from './hal-link';

@Injectable({
  providedIn: 'root'
})
export class SourceService {

  private apiUrl = apiUrl + '/source-search';

  constructor(private http: HttpClient) { }

  loadLink(halLink: HalLink): Observable<HalSource> {
    return this.http.get<HalSource>(halLink.href);
  }

  search(term: string): Observable<HalSource> {
    return this.http.get<HalSource>(`${this.apiUrl}?search=${term}`);
  }
}
