import { Component, OnInit } from '@angular/core';
import { ArtistService } from '../../../data/service/artist.service';
import { Artist } from '../../../data/schema/artist';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { AppComponent } from '../../../app.component';
import { HalLink } from '../../../data/schema/hal-link';
import { Subject } from 'rxjs';
import { map, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { HalArtist } from 'src/app/data/schema/hal-artist';

@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.css']
})
export class ArtistComponent implements OnInit {
  public selected = '';
  protected halArtist: HalArtist;
  protected searchString: Subject<string>;
  protected currentSearch: string;
  public freetextSearch = '';

  constructor(
    private artistService: ArtistService,
    private location: Location,
    private route: ActivatedRoute,
    private appComponent: AppComponent
  ) {
    this.appComponent.setTitle('Search Artists by Year');

    this.searchString = new Subject();
    this.searchString.subscribe(search => {
      this.location.go('artist', '?search=' + encodeURI(search));
      this.appComponent.setTitle('Search Artists matching "' + search + '"');

      this.artistService.searchByLetter(search)
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

  protected alphabet(): Array<string> {
    const alphabet: Array<string> = [];

    for (let i = 65; i <= 90; i++) {
      alphabet.push(String.fromCharCode(i));
    }

    return alphabet;
  }

  protected search(search) {
    this.searchString.next(search);
  }

  protected submitSearch($event): void {
    if ($event.keyCode === 13) {
      this.searchString.next('%' + this.freetextSearch);
    }
  }

  protected loadLink(halLink: HalLink): void {
    this.artistService.loadLink(halLink)
      .subscribe(halArtist => this.halArtist = halArtist);
  }
}


