import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { apiUrl } from '../../application/config/app.config';

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
