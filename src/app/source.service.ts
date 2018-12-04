import { Injectable } from '@angular/core';
import { HalSource } from './hal-source';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SourceService {

  private apiUrl = 'https://api.etreedb.org/source-search';

  constructor(private http: HttpClient) { }

  loadUrl(url: string): Observable<HalSource> {
    return this.http.get<HalSource>(`${url}`);
  }

  search(term: string): Observable<HalSource> {
    if (! term.trim()) {
//      return of();
    }

    return this.http.get<HalSource>(`${this.apiUrl}?search=${term}`);
  }
}
