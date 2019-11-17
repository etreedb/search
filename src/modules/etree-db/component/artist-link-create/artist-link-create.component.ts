import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArtistService } from '@modules/data/service/artist.service';
import { Artist } from '@modules/data/schema/artist';
import { HalLink } from '@modules/data/schema/hal-link';
import { environment } from '@env';
import * as $ from 'jquery';
import { ArtistLinkService } from '@modules/data/service/artist-link.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-artist-link-create',
  templateUrl: './artist-link-create.component.html',
  styleUrls: ['./artist-link-create.component.css']
})
export class ArtistLinkCreateComponent implements OnInit {
  public artist: Artist;
  public artistLinkLink: HalLink;
  public validation_messages: any;
  public linkName: string;
  public url: string;

  constructor(
    private route: ActivatedRoute,
    private artistService: ArtistService,
    private artistLinkService: ArtistLinkService
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(
      queryParams => {
        this.artistService.find(queryParams['artist_id'])
          .subscribe(artist => {
            this.artist = artist;

            const artistLinkQueryParams: any = {
              'filter': [
                {
                  field: 'artist',
                  type: 'eq',
                  value: this.artist.id
                }
              ],
              'order-by': [
                {
                  field: 'id',
                  type: 'field',
                  direction: 'desc'
                }
              ]
            };
            this.artistLinkLink = {
              href: environment.apiUrl + '/artist-link?' + $.param(artistLinkQueryParams)
            };
          });
      });
  }

  onSubmit() {
    const formData = new FormData();
    this.validation_messages = null;
    formData.append('name', this.linkName);
    formData.append('url', this.url);
    formData.append('artist', String(this.artist.id));

    this.artistLinkService.post(formData)
      .subscribe(
        success => {
          window.location.reload();
        },
        (error: HttpErrorResponse) => {
          switch (error.status) {
            case 422:
              this.validation_messages = error.error.validation_messages;
              break;
            default:
              alert('There was an error saving your link.');
              console.log(error);
          }
        }
    );
  }
}
