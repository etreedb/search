import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ArtistService } from '@modules/data/service/artist.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Artist } from '@modules/data/schema/artist';
import { distinctUntilChanged, debounceTime } from 'rxjs/operators';
import { GraphqlService } from '@modules/data/service/graphql.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-artist-edit',
  templateUrl: './artist-edit.component.html',
  styleUrls: ['./artist-edit.component.css']
})
export class ArtistEditComponent implements OnInit {
  public artistFormGroup: FormGroup;
  public artist: Artist;
  public officialUrlOk = true;
  public nameOk = true;
  public abbreviationOk = true;
  public validation_messages: any;

  constructor(
    private graphqlService: GraphqlService,
    private artistService: ArtistService,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.validation_messages = {
      name: [],
      icon: [],
      officialUrl: [],
      abbreviation: [],
      isTradable: [],
      description: []
    };
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.artistService.find(params.artist_id).subscribe(artist => {
        this.artist = artist;
        this.artistFormGroup = this.formBuilder.group({
          name: [artist.name],
          icon: [artist.icon],
          officialUrl: [artist.officialUrl],
          abbreviation: [artist.abbreviation],
          isTradable: [artist.isTradable],
          description: [artist.description]
        });

        this.onChanges();
      });
    });
  }

  public onSubmit() {
    this.artistService.patch(this.artist.id, this.artistFormGroup.value)
    .subscribe(
      success => {
      },
      (error: HttpErrorResponse) => {
        console.log('subscribe error', error.constructor.name);
        switch (error.status) {
          case 422:
            this.validation_messages = error.error.validation_messages;
            break;
          default:
            console.log(error);
            break;
        }
      },
      () => {
        this.router.navigate(['/source-admin/index', this.artist.id]);
      }
    );
  }

  onChanges() {
    this.artistFormGroup.get('name').valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged()
      )
      .subscribe(value => {
        value = this.graphqlService.escapeQuotes(value);
        this.graphqlService.query(`
          { artist (filter: { id_neq: "${this.artist.id}", name: "${value}"}) { name } }
        `).subscribe( response => {
          this.nameOk = response.data.artist.length === 0;
          if (this.nameOk) {
            this.validation_messages.name = [];
          } else {
            this.validation_messages.name = ['Duplicate Artist Name'];
          }
        });
      });

    const uriPattern = /(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;
    this.artistFormGroup.get('officialUrl').valueChanges
      .subscribe( value => {
        this.officialUrlOk = uriPattern.test(value);
        if (value === '') {
          this.officialUrlOk = true;
        }

        if (! this.officialUrlOk) {
          this.validation_messages.officialUrl = ['Invalid URL'];
        } else {
          this.validation_messages.officialUrl = [];
        }
      });

      this.artistFormGroup.get('abbreviation').valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged()
      )
      .subscribe( value => {
        value = this.graphqlService.escapeQuotes(value);
        this.graphqlService.query(`
          { artist (filter: { id_neq: "${this.artist.id}", abbreviation: "${value}"}) { name } }
        `).subscribe( response => {
          this.abbreviationOk = response.data.artist.length === 0 || ! value;
          if (this.abbreviationOk) {
            this.validation_messages.abbreviation = [];
          } else {
            this.validation_messages.abbreviation = ['Duplicate Artist Abbreviation'];
          }
        });
      }
    );


  }
}
