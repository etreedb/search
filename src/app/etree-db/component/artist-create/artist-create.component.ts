import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, catchError, map } from 'rxjs/operators';
import { ArtistService } from 'src/app/data/service/artist.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { GraphqlService } from 'src/app/data/service/graphql.service';
import { HalArtist } from 'src/app/data/schema/hal-artist';

import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-artist-create',
  templateUrl: './artist-create.component.html',
  styleUrls: ['./artist-create.component.css']
})
export class ArtistCreateComponent implements OnInit {
  private newArtistId: number;
  public artistForm: FormGroup;
  public validation_messages = {
    name: [],
    officialUrl: [],
    abbreviation: [],
    isTradable: [],
    description: []
  };

  public abbreviationOk = true;
  public officialUrlOk = true;
  public nameOk = false;
  public isTradableOk = true;

  constructor(
    private artistService: ArtistService,
    private graphQlService: GraphqlService,
    private formBuilder: FormBuilder,
    private router: Router,
    private appComponent: AppComponent
  ) { }

  ngOnInit() {
    this.appComponent.setTitle('Create New Artist');

    this.artistForm = this.formBuilder.group({
      name: '',
      officialUrl: '',
      abbreviation: '',
      isTradable: '1',
      description: ''
    });

    this.onChanges();
  }

  onChanges() {
    this.artistForm.get('name').valueChanges
    .pipe(
      debounceTime(300),
      distinctUntilChanged()
    )
    .subscribe( value => {
      value = this.graphQlService.escapeQuotes(value);
      this.graphQlService.query(`
        { artist (filter: { name: "${value}"}) { name } }
      `).subscribe( response => {
        this.nameOk = response.data.artist.length === 0;
        if (this.validation_messages.name) {
          delete this.validation_messages.name;
        }
      });
    }
    );

    const uriPattern = /(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;
    this.artistForm.get('officialUrl').valueChanges
      .subscribe( value => {
        this.officialUrlOk = uriPattern.test(value);
        if (value === '') {
          this.officialUrlOk = true;
        }
      });

    this.artistForm.get('abbreviation').valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged()
      )
      .subscribe( value => {
        value = this.graphQlService.escapeQuotes(value);
        this.graphQlService.query(`
          { artist (filter: { abbreviation: "${value}"}) { name } }
        `).subscribe( response => {
          this.abbreviationOk = response.data.artist.length === 0 || ! value;
          if (this.validation_messages.abbreviation) {
            delete this.validation_messages.abbreviation;
          }
        });
      }
    );

    this.artistForm.get('isTradable').valueChanges
    .subscribe( data => {
      this.isTradableOk = true;

      if (this.validation_messages.isTradable) {
        delete this.validation_messages.isTradable;
      }

    });
  }

  onSubmit($event): void {
    const post = {
      name: this.artistForm.value.name,
      officialUrl: this.artistForm.value.officialUrl,
      abbreviation: this.artistForm.value.abbreviation,
      isTradable: this.artistForm.value.isTradable,
      description: this.artistForm.value.description
    };

    this.artistService.post(post).subscribe(
      success => {
        this.newArtistId = success.id;
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
        this.router.navigate(['/performance/create'], {queryParams: {artist_id: this.newArtistId}});
      }
    );
  }

}

