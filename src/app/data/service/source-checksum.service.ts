import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HalLink } from '../schema/hal-link';
import { HalSourceChecksum } from '../schema/hal-source-checksum';

@Injectable({
  providedIn: 'root'
})
export class SourceChecksumService {
  constructor(private http: HttpClient) { }

  loadLink(halLink: HalLink): Observable<HalSourceChecksum> {
    return this.http.get<HalSourceChecksum>(halLink.href);
  }
}
