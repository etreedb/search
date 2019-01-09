import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap, switchMap, catchError } from 'rxjs/operators';
import { ArtistService } from 'src/app/data/service/artist.service';

@Component({
  selector: 'app-performance-search2',
  templateUrl: './performance-search2.component.html',
  styleUrls: ['./performance-search2.component.css']
})
export class PerformanceSearch2Component implements OnInit {
  public searchForm: FormGroup;
  public nameSearching: boolean;
  public nameSearchFailed: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private artistService: ArtistService
  ) {
    this.searchForm = this.formBuilder.group({
      name: '',
      performanceDate: null,
      year: null,
      venue: '',
      city: '',
      state: '',
      set1: '',
      set2: '',
      set3: '',
      description: ''
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
  }

  onSubmit($event) {
    const query = this.searchForm.value;

    console.log(query);

  }
}
