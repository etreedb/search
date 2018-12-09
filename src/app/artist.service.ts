import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { apiUrl } from './app.component';
import { Observable, throwError, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArtistService {
  private apiUrl = apiUrl;

  constructor(private http: HttpClient) { }

  lookup(term: string): Observable <string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/artist-lookup?search=${term}`);
  }
}
