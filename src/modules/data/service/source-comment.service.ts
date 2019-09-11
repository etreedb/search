import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HalLink } from '../schema/hal-link';
import { HalSourceComment } from '../schema/hal-source-comment';
import { Memoize } from '../decorator/memoize';
import { environment } from '@env';
import * as $ from 'jquery';

@Injectable({
  providedIn: 'root'
})
export class SourceCommentService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  public loadLink(halLink: HalLink): Observable<HalSourceComment> {
    return this.http.get<HalSourceComment>(halLink.href);
  }

  @Memoize()
  public findBy(query: Array<any>) {
    return this.http.get<HalSourceComment>(`${this.apiUrl}/source-comment?` + $.param(query));
  }
}
