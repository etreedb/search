import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { HalLink } from './hal-link';
import { HalSourceComment } from './hal-source-comment';

@Injectable({
  providedIn: 'root'
})
export class SourceCommentService {

  constructor(private http: HttpClient) { }

  loadLink(halLink: HalLink): Observable<HalSourceComment> {
    return this.http.get<HalSourceComment>(halLink.href);
  }
}
