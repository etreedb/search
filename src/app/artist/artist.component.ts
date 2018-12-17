import { Component, OnInit } from '@angular/core';
import { ArtistService } from '../artist.service';
import { Artist } from '../artist';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { AppComponent } from '../app.component';
import { HalLink } from '../hal-link';

@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.css']
})
export class ArtistComponent implements OnInit {
  public selected = '';
  public artists: Array<Artist> = [];
  private links: any;
  public page: {
    current: Number;
    count: Number;
  };

  public searchString = '';
  public notFound = false;

  constructor(
    private artistService: ArtistService,
    private location: Location,
    private route: ActivatedRoute,
    private appComponent: AppComponent
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const search = params['search'];
      if (search) {
        this.search(search);
        this.selected = search;
      }
    });

    this.appComponent.setTitle('Search Artists by Year');
  }

  alphabet(): Array<string> {
    const alphabet: Array<string> = [];

    for (let i = 65; i <= 90; i++) {
      alphabet.push(String.fromCharCode(i));
    }

    return alphabet;
  }

  selectedCharacter(): string {
    return this.selected;
  }

  search(term): void {
    if (! term) {
      return;
    }

    this.notFound = false;

    this.location.replaceState('artist', '?search=' + encodeURI(term));

    this.artistService.searchByLetter(term).subscribe(data => {
      this.artists = data._embedded.artist;
      if (! this.artists.length) {
        this.notFound = true;
      }
      this.links = data._links;
      this.page = {
        current: data.page,
        count: data.page_count
      };

      this.appComponent.setTitle('Search Artists matching "' + term + '"');
    });
  }

  loadLink(halLink: HalLink): void {
    this.artistService.loadLink(halLink).subscribe(data => {
      this.artists = data._embedded.artist;
      if (! this.artists.length) {
        this.notFound = true;
      }
      this.links = data._links;
      this.page = {
        current: data.page,
        count: data.page_count
      };
    });
  }

}


