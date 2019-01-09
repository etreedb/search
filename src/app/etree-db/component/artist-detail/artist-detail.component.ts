import { ActivatedRoute } from '@angular/router';
import { AppComponent } from '../../../app.component';
import { Artist } from '../../../data/schema/artist';
import { ArtistService } from '../../../data/service/artist.service';
import { Component, OnInit } from '@angular/core';
import { HalPerformance } from '../../../data/schema/hal-performance';
import { Location } from '@angular/common';
import { map } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import { plainToClass } from 'class-transformer';
import { PerformanceService } from '../../../data/service/performance.service';

@Component({
  selector: 'app-artist-detail',
  templateUrl: './artist-detail.component.html',
  styleUrls: ['./artist-detail.component.css']
})
export class ArtistDetailComponent implements OnInit {
  public artist: Artist;
  public halPerformance: Observable<HalPerformance>;
  public currentYear = 0;
  public year: Subject<number> = new Subject();

  constructor(
    private artistService: ArtistService,
    private performanceService: PerformanceService,
    private route: ActivatedRoute,
    private location: Location,
    private appComponent: AppComponent
  ) {
    this.year.subscribe( year => {
      this.halPerformance = this.performanceService.findByYear(+this.artist.id, year)
      .pipe(map(halPerformance => {
        this.location.go('artist/' + this.artist.id, '?year=' + year);
        this.appComponent.setTitle(this.artist.name + ' - ' + year);
        this.currentYear = year;

        return plainToClass(HalPerformance, halPerformance);
      }));
    });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.artistService.find(+params['id']).subscribe(artist => {
        this.artist = artist as Artist;

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
}
