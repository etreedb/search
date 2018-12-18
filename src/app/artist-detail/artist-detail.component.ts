import { Component, OnInit } from '@angular/core';
import { ArtistService } from '../artist.service';
import { PerformanceService } from '../performance.service';
import { Artist } from '../artist';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { AppComponent } from '../app.component';
import { HalLink } from '../hal-link';
import { ArtistLinkService } from '../artist-link.service';
import { HalPerformance } from '../hal-performance';
import { HalArtistLink } from '../hal-artist-link';

@Component({
  selector: 'app-artist-detail',
  templateUrl: './artist-detail.component.html',
  styleUrls: ['./artist-detail.component.css']
})
export class ArtistDetailComponent implements OnInit {
  public artist: Artist;
  public halPerformance: HalPerformance;
  public halArtistLink: HalArtistLink;
  public year = 0;
  public toggleArtistLinksFlag = false;
  public toggleAuditFlag = false;

  constructor(
    private artistService: ArtistService,
    private performanceService: PerformanceService,
    private artistLinkService: ArtistLinkService,
    private route: ActivatedRoute,
    private location: Location,
    private appComponent: AppComponent
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.artistService.find(+params['id']).subscribe(data => {
        this.artist = data;

        this.route.queryParams.subscribe(qparams => {
          this.year = +qparams['year'];

          if (! this.year) {
            this.year = data._computed.years[data._computed.years.length - 1];
          }

          this.loadYear();
          this.appComponent.setTitle(this.artist.name + ' - ' + this.year);
        });
      });
   });
  }

  getYear(): number {
    return this.year;
  }

  toggleArtistLinks(): void {
    this.toggleArtistLinksFlag = ! this.toggleArtistLinksFlag;
  }

  toggleAudit() {
    this.toggleAuditFlag = ! this.toggleAuditFlag;

    if (this.toggleAuditFlag) {
      this.toggleArtistLinksFlag = false;
    }
  }

  loadYear(): void {
    this.location.replaceState('artist/' + this.artist.id, '?year=' + this.year);
    this.appComponent.setTitle(this.artist.name + ' - ' + this.year);

    this.performanceService.findByYear(+this.artist.id, this.year)
      .subscribe( halPerformance => this.halPerformance = halPerformance);
  }
}
