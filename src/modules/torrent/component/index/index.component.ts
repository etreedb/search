import { Component, OnInit } from '@angular/core';
import { HalLink } from '@modules/data/schema/hal-link';
import { environment } from '@env';
import * as $ from 'jquery';
import { Subject, of, Observable } from 'rxjs';
import { HalShnFlacArtist } from '@modules/data/schema/hal-shn-flac-artist';
import { ShnFlacArtistService } from '@modules/data/service/shn-flac-artist.service';
import { ActivatedRoute } from '@angular/router';
import { AppComponent } from '@app/app.component';
import { Location } from '@angular/common';
import { debounceTime, distinctUntilChanged, switchMap, catchError } from 'rxjs/operators';

@Component({
  selector: 'app-torrent-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  public artistLink: HalLink;
  public selected = '';
  public halArtist: HalShnFlacArtist;
  protected searchString: Subject<string>;
  protected currentSearch: string;
  public freetextSearch = '';

  constructor(
    private shnFlacArtistService: ShnFlacArtistService,
    private location: Location,
    private route: ActivatedRoute,
    private appComponent: AppComponent
  ) {
    const artistQueryParams: any = {
      'order-by': [
        {
          field: 'name',
          type: 'field',
          direction: 'asc'
        }
      ]
    };
    this.artistLink = {
      href: environment.apiUrl + '/shn-flac-artist?' + $.param(artistQueryParams)
    };

    this.appComponent.setTitle('Search Torrent Artists');

    this.searchString = new Subject();
    this.searchString.subscribe(search => {
      this.location.go('torrent', '?search=' + encodeURI(search));
      this.appComponent.setTitle('Search Torrent Artists matching "' + search + '"');

      this.shnFlacArtistService.searchByLetter(search)
        .subscribe(halArtist => this.halArtist = halArtist);

      this.currentSearch = search.replace('%', '');
    });

   }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params.search) {
        this.searchString.next(params.search);
      }
    });
  }

  alphabet(): Array<string> {
    const alphabet: Array<string> = [];

    for (let i = 65; i <= 90; i++) {
      alphabet.push(String.fromCharCode(i));
    }

    return alphabet;
  }

  search(search) {
    this.searchString.next(search);
  }

  submitSearch($event): void {
    if ($event.keyCode === 13) {
      this.searchString.next('%' + this.freetextSearch);
    }
  }

  loadLink(halLink: HalLink): void {
    this.shnFlacArtistService.loadLink(halLink)
      .subscribe(halArtist => this.halArtist = halArtist);
  }

  lookup = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(term =>
        this.shnFlacArtistService.lookup(term).pipe(
          catchError(() => {
            return of([]);
          }))
      )
    )

}
