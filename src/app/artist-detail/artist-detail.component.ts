import { Component, OnInit } from '@angular/core';
import { ArtistService } from '../artist.service';
import { PerformanceService } from '../performance.service';
import { Artist } from '../artist';
import { Performance } from '../performance';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { AppComponent } from '../app.component';
import { HalLink } from '../hal-link';
import { ArtistLinkService } from '../artist-link.service';
import { ArtistLink } from '../artist-link';

@Component({
  selector: 'app-artist-detail',
  templateUrl: './artist-detail.component.html',
  styleUrls: ['./artist-detail.component.css']
})
export class ArtistDetailComponent implements OnInit {
  private artistId: number;
  public artist: Artist;
  public year = 0;
  public performances: Array<Performance>;
  public links: {};
  public page: {
    current: Number;
    count: Number;
  };
  private lastSortField: string;
  public artistLinks: Array<ArtistLink>;
  public toggleArtistLinksFlag = false;

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
      this.artistId = +params['id']; // (+) converts string 'id' to a number

      this.artistService.find(this.artistId).subscribe(data => {
        this.route.queryParams.subscribe(qparams => {
          this.year = +qparams['year'];

          if (! this.year) {
            this.year = data._computed.years[data._computed.years.length - 1];
          }

          this.loadYear();
          this.artist = data;
          this.artistLinkService.loadLink(this.artist._embedded.artistLink._links.self)
            .subscribe( halArtistLink => {
              this.artistLinks = halArtistLink._embedded.artist_link;
//              console.log(halArtistLink);
    //          alert('loaded');
            });
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

  loadYear(): void {
    this.location.replaceState('artist/' + this.artistId, '?year=' + this.year);

    this.performanceService.findByYear(this.artistId, this.year).subscribe(data => {
      this.page = {
        current: data.page,
        count: data.page_count
      };
      this.performances = data._embedded.performance;
      this.links = data._links;

      this.appComponent.setTitle(this.artist.name + ' - ' + this.year);
    });
  }

  sort(field: string): void {
    let modifier = 1;
    if (this.lastSortField === field) {
      modifier = -1;
      this.lastSortField = '';
    } else {
      this.lastSortField = field;
    }

    this.performances.sort(function(a, b) {
      switch (field) {
        case 'performanceDate':
        case 'venue':
        case 'city':
        case 'state':
          if (a[field] < b[field]) {
            return -1 * modifier;
          }
          if (b[field] < a[field]) {
            return 1 * modifier;
          }
          break;
        case 'name':
          if (a._embedded.artist.name < b._embedded.artist.name) {
            return -1 * modifier;
          }
          if (b._embedded.artist.name < a._embedded.artist.name) {
            return 1 * modifier;
          }
      }

      return 0;
    });
  }

  loadLink(halLink: HalLink): void {
    this.performanceService.loadLink(halLink).subscribe(data => {
      this.page = {
        current: data.page,
        count: data.page_count
      };
      this.performances = data._embedded.performance;
      this.links = data._links;
    });
  }
}
