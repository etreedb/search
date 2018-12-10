import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { apiUrl } from './app.component';

@Injectable({
  providedIn: 'root'
})
export class GraphqlService {

  constructor(private http: HttpClient) { }

  private apiUrl = apiUrl + '/graphql';

  query(query: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}`, {'query': query});
  }
}
