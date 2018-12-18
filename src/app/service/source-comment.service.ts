import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { HalLink } from '../schema/hal-link';
import { HalSourceComment } from '../schema/hal-source-comment';

@Injectable({
  providedIn: 'root'
})
export class SourceCommentService {

  constructor(private http: HttpClient) { }

  loadLink(halLink: HalLink): Observable<HalSourceComment> {
    return this.http.get<HalSourceComment>(halLink.href);
  }
}
