import { Injectable } from '@angular/core';
import { HalSource } from './hal-source';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { apiUrl } from './app.component';

@Injectable({
  providedIn: 'root'
})
export class SourceService {

  private apiUrl = apiUrl + '/source-search';

  constructor(private http: HttpClient) { }

  loadUrl(url: string): Observable<HalSource> {
    return this.http.get<HalSource>(`${url}`);
  }

  search(term: string): Observable<HalSource> {
    return this.http.get<HalSource>(`${this.apiUrl}?search=${term}`);
  }
}
