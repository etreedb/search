import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env';
import { Observable } from 'rxjs';
import { HalLink } from '../schema/hal-link';
import * as $ from 'jquery';
import { HalShnFlacTorrent } from '../schema/hal-shn-flac-torrent';
import { ShnFlacTorrent } from '../schema/shn-flac-torrent';

@Injectable({
  providedIn: 'root'
})
export class ShnFlacTorrentService {
  private apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient
  ) {}

  public query(param: object) {
    return this.http.get<HalShnFlacTorrent>(`${this.apiUrl}/shn-flac-torrent?` + $.param(param));
  }

  public loadLink(halLink: HalLink): Observable<HalShnFlacTorrent> {
    return this.http.get<HalShnFlacTorrent>(halLink.href);
  }

  public find(id: number): Observable<ShnFlacTorrent> {
    return this.http.get<ShnFlacTorrent>(`${this.apiUrl}/shn-flac-torrent/` + id);
  }
}
