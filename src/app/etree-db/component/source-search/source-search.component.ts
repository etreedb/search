import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap, switchMap, catchError } from 'rxjs/operators';
import { ArtistService } from 'src/app/data/service/artist.service';
import { ActivatedRoute } from '@angular/router';
import * as $ from 'jquery';
import { Location } from '@angular/common';
import { AppComponent } from 'src/app/app.component';
import { SourceService } from 'src/app/data/service/source.service';
import { HalSource } from 'src/app/data/schema/hal-source';

@Component({
  selector: 'app-source-search',
  templateUrl: './source-search.component.html',
  styleUrls: ['./source-search.component.css']
})
export class SourceSearchComponent implements OnInit {
  public searchForm: FormGroup;
  public nameSearching: boolean;
  public nameSearchFailed: boolean;
  public halSource: HalSource;

  constructor(
    private formBuilder: FormBuilder,
    private artistService: ArtistService,
    private sourceService: SourceService,
    private route: ActivatedRoute,
    private location: Location,
    private appComponent: AppComponent
  ) {
    this.appComponent.setTitle('Source Search');

    this.searchForm = this.formBuilder.group({
      name: '',
      nameExact: false,
      performanceDate: null,
      performanceDateExact: false,
      year: null,
      yearExact: false,
      venue: '',
      venueExact: false,
      city: '',
      cityExact: false,
      state: '',
      stateExact: false,
      set1: '',
      set1Exact: false,
      set2: '',
      set2Exact: false,
      set3: '',
      set3Exact: false,
      allSets: '',
      allSetsExact: false,
      description: '',
      descriptionExact: false,
      title: '',
      titleExact: false,

      summary: '',
      summaryExact: false,
      sourceDescription: '',
      sourceDescriptionExact: false,
      circulationDate: '',
      circulationDateExact: false,
      archiveIdentifier: '',
      archiveIdentifierExact: false
    });
  }

  lookup = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      tap(() => this.nameSearching = true),
      switchMap(term =>
        this.artistService.lookup(term)
        .pipe(
          tap(() => this.nameSearchFailed = false),
          catchError(() => {
            this.nameSearchFailed = true;
            return of([]);
          })
        )
      ),
      tap(() => this.nameSearching = false)
    )

  ngOnInit() {
    this.route.queryParams.subscribe( queryParams => {
      const params = {};
      Object.keys(queryParams).forEach( key => {
        if (queryParams[key] === 'false') {
          params[key] = false;
        } else {
          params[key] = queryParams[key];
        }
      });

      this.searchForm.setValue(params);
      if (queryParams) {
        this.onSubmit();
      }
    });
  }

  onSubmit() {

    console.log(this.searchForm.value);

    this.sourceService.search(this.searchForm.value)
      .subscribe(halSource => this.halSource = halSource);

    this.location.go('source/search', '?' + $.param(this.searchForm.value));
  }
}
