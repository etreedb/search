import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ShnFlacArtistService } from '@modules/data/service/shn-flac-artist.service';
import { ShnFlacArtist } from '@modules/data/schema/shn-flac-artist';
import { HalShnFlacTorrent } from '@modules/data/schema/hal-shn-flac-torrent';
import { Observable, Subject } from 'rxjs';
import { ShnFlacTorrentService } from '@modules/data/service/shn-flac-torrent.service';
import { map } from 'rxjs/operators';
import { Location } from '@angular/common';
import { AppComponent } from '@app/app.component';

@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.css']
})
export class ArtistComponent implements OnInit {
  public shnFlacArtist: ShnFlacArtist;
  public halShnFlacTorrent: Observable<HalShnFlacTorrent>;
  public currentYear = 0;
  public year: Subject<number>;

  constructor(
    private route: ActivatedRoute,
    private shnFlacArtistService: ShnFlacArtistService,
    private shnFlacTorrentService: ShnFlacTorrentService,
    private location: Location,
    private appComponent: AppComponent
  ) {
    this.year = new Subject();
  }

  ngOnInit() {
    this.year.subscribe( year => {
      this.halShnFlacTorrent = this.shnFlacTorrentService.findByYear(+this.shnFlacArtist.id, year)
      .pipe(map(halPerformance => {
        this.location.go('/torrent/artist/' + this.shnFlacArtist.id, '?year=' + year);
        this.appComponent.setTitle(this.shnFlacArtist.name + ' - ' + year);

        this.currentYear = year;

        return halPerformance;
      }));
    });

    this.route.params.subscribe(params => {
      this.shnFlacArtistService.find(params['id'])
        .subscribe(artist => {
          console.log(artist);
          this.shnFlacArtist = artist;
        });

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
