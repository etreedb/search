import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ArchiveOrgItemService {

  constructor(private http: HttpClient) { }

  metadata(identifier: string): Observable <any> {
    identifier = encodeURI(identifier);

    return this.http.get<any>(`https://archive.org/metadata/${identifier}`);
  }
}
