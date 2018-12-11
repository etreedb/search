import { Component, OnInit } from '@angular/core';
import { ArtistService } from '../artist.service';
import { Artist } from '../artist';
import { Location } from '@angular/common';

@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.css']
})
export class ArtistComponent implements OnInit {
  private selected = '';
  private artists: Array<Artist> = [];
  private links: any;
  private page: {
    current: Number;
    count: Number;
  };

  constructor(
    private artistService: ArtistService,
    private location: Location
  ) { }

  ngOnInit() {
  }

  alphabet(): Array<string> {
    const alphabet: Array<string> = [];

    for (let i = 65; i <= 90; i++) {
      alphabet.push(String.fromCharCode(i));
    }

    alphabet.push('other');

    return alphabet;
  }

  selectedCharacter(): string {
    return this.selected;
  }

  search(character): void {
    this.location.replaceState('artist', '?chr=' + encodeURI(character));

    this.artistService.searchByLetter(character).subscribe(data => {
      this.artists = data._embedded.artist;
      this.links = data._links;
      this.page = {
        current: data.page,
        count: data.page_count
      };
    });
  }

  loadUrl(url): void {
    this.artistService.loadUrl(url).subscribe(data => {
      this.artists = data._embedded.artist;
      this.links = data._links;
      this.page = {
        current: data.page,
        count: data.page_count
      };
    });
  }

}


