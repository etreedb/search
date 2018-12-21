import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { HalLink } from '../app.schema/hal-link';
import { HalSourceChecksum } from '../app.schema/hal-source-checksum';

@Injectable({
  providedIn: 'root'
})
export class SourceChecksumService {
  constructor(private http: HttpClient) { }

  loadLink(halLink: HalLink): Observable<HalSourceChecksum> {
    return this.http.get<HalSourceChecksum>(halLink.href);
  }
}
