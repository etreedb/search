import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ShnFlacArtistService } from '@modules/data/service/shn-flac-artist.service';
import { ShnFlacArtist } from '@modules/data/schema/shn-flac-artist';
import { HalShnFlacTorrent } from '@modules/data/schema/hal-shn-flac-torrent';
import { Observable } from 'rxjs';
import { ShnFlacTorrentService } from '@modules/data/service/shn-flac-torrent.service';

@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.css']
})
export class ArtistComponent implements OnInit {
  public shnFlacArtist: ShnFlacArtist;
  public halShnFlacTorrent: Observable<HalShnFlacTorrent>;

  constructor(
    private route: ActivatedRoute,
    private shnFlacArtistService: ShnFlacArtistService,
    private shnFlacTorrentService: ShnFlacTorrentService
  ) {  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.shnFlacArtistService.find(params['id'])
        .subscribe(artist => this.shnFlacArtist = artist);

      const torrentQueryParams: any = {
        'filter': [
          {
            type: 'innerJoin',
            field: 'shnFlacArtist',
            alias: 'shnFlacArtist'
          },
          {
            type: 'eq',
            field: 'shnFlacArtist',
            value: params['id']
          }
        ],
        'order-by': [
          {
            field: 'name',
            alias: 'shnFlacArtist',
            type: 'field',
            direction: 'asc'
          },
          {
            field: 'performanceDate',
            type: 'field',
            direction: 'asc'
          }
        ]
      };

      this.halShnFlacTorrent = this.shnFlacTorrentService
        .query(torrentQueryParams);
    });
  }
}
