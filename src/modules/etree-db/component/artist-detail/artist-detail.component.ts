import { ActivatedRoute } from '@angular/router';
import { AppComponent } from '@app/app.component';
import { Artist } from '@data/schema/artist';
import { ArtistService } from '@data/service/artist.service';
import { Component, OnInit } from '@angular/core';
import { HalPerformance } from '@data/schema/hal-performance';
import { Location } from '@angular/common';
import { map } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import { plainToClass } from 'class-transformer';
import { PerformanceService } from '@data/service/performance.service';
import { ShnFlacArtistService } from '@modules/data/service/shn-flac-artist.service';
import { HalLink } from '@modules/data/schema/hal-link';

@Component({
  selector: 'app-artist-detail',
  templateUrl: './artist-detail.component.html',
  styleUrls: ['./artist-detail.component.css']
})
export class ArtistDetailComponent implements OnInit {
  public artist: Artist;
  public halShnFlacTorrentLink: HalLink;
  public halPerformance: Observable<HalPerformance>;
  public currentYear = 0;
  public year: Subject<number> = new Subject();

  constructor(
    private artistService: ArtistService,
    private shnFlacArtistService: ShnFlacArtistService,
    private performanceService: PerformanceService,
    private route: ActivatedRoute,
    private location: Location,
    private appComponent: AppComponent
  ) {
    this.year.subscribe( year => {
      this.halPerformance = this.performanceService.findByYear(+this.artist.id, year)
      .pipe(map(halPerformance => {
        this.location.go('/db/artist/' + this.artist.id, '?year=' + year);
        this.appComponent.setTitle(this.artist.name + ' - ' + year);
        this.currentYear = year;

        return plainToClass(HalPerformance, halPerformance);
      }));
    });


    this.route.params.subscribe(params => {
      this.artistService.find(+params['id']).subscribe(artist => {
        this.artist = artist as Artist;

        if (this.artist._embedded.shnFlacArtist) {
          this.shnFlacArtistService
            .loadShnFlacArtistLink(this.artist._embedded.shnFlacArtist._links.self)
            .subscribe(shnFlacArtist => {
              this.halShnFlacTorrentLink = shnFlacArtist._embedded.shnFlacTorrent._links.self;
            });
        }

        this.route.queryParams.subscribe(qparams => {
          let year = +qparams['year'];

          if (! year) {
            year = artist._computed.years[artist._computed.years.length - 1];
          }

          this.year.next(year);
        });
      });
   });

  }

  ngOnInit() {
  }
}
