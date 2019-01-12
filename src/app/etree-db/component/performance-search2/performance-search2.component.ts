import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap, switchMap, catchError } from 'rxjs/operators';
import { ArtistService } from 'src/app/data/service/artist.service';
import { PerformanceService } from 'src/app/data/service/performance.service';
import { HalPerformance } from 'src/app/data/schema/hal-performance';
import { ActivatedRoute } from '@angular/router';
import * as $ from 'jquery';
import { Location } from '@angular/common';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-performance-search2',
  templateUrl: './performance-search2.component.html',
  styleUrls: ['./performance-search2.component.css']
})
export class PerformanceSearch2Component implements OnInit {
  public searchForm: FormGroup;
  public nameSearching: boolean;
  public nameSearchFailed: boolean;
  public halPerformance: HalPerformance;

  constructor(
    private formBuilder: FormBuilder,
    private artistService: ArtistService,
    private performanceService: PerformanceService,
    private route: ActivatedRoute,
    private location: Location,
    private appComponent: AppComponent
  ) {
    this.appComponent.setTitle('Performance Search');

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

      console.log(params);

      this.searchForm.setValue(params);
      if (queryParams) {
        this.onSubmit();
      }
    });
  }

  onSubmit() {
    this.performanceService.search(this.searchForm.value)
      .subscribe(halPerformance => this.halPerformance = halPerformance);

    this.location.go('performance/search2', '?' + $.param(this.searchForm.value));
  }
}
