import { Component, OnInit } from '@angular/core';
import { ArtistService } from '../../artist.service';
import { GraphqlService } from '../../graphql.service';
import {Observable, of} from 'rxjs';
import {catchError, debounceTime, distinctUntilChanged, map, tap, switchMap} from 'rxjs/operators';
import { PerformanceService } from '../../performance.service';
import { HalPerformance } from '../../hal-performance';
import { applySourceSpanToExpressionIfNeeded } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-artist-lookup',
  templateUrl: './artist-lookup.component.html',
  styleUrls: ['./artist-lookup.component.css']
})
export class ArtistLookupComponent implements OnInit {
  public name: any = 'Grateful Dead';
  public performanceDate: any = '1973-02-09';
  public searching = false;
  public searchFailed = false;

  public result: any;
  public resultNotFound = false;

  public lookupContent = 'Enter name and Performance Date then Lookup';

  constructor(
    private artistService: ArtistService,
    private performanceService: PerformanceService,
    private graphqlService: GraphqlService
  ) { }

  ngOnInit() {
  }

  artistLookup (): void {
    if (! this.name || ! this.performanceDate) {
      return;
    }

    this.resultNotFound = false;
    this.result = null;

    this.graphqlService.query(`{
      artist (filter:{name:"${this.name}"}) {
        name
        performance (filter:{performanceDate:"${this.performanceDate}"}) {
          id performanceDate venue city state
        }
      }
    }`).subscribe(data  => {
      if (data.data.artist[0].performance.length) {
        const result = data.data.artist[0].performance[0];

        this.result = {
          name: data.data.artist[0].name,
          performanceDate: result.performanceDate,
          venue: result.venue,
          city: result.city,
          state: result.state
        };
      } else {
        this.resultNotFound = true;
      }

    });
  }

  lookup = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      tap(() => this.searching = true),
      switchMap(term =>
        this.artistService.lookup(term).pipe(
          tap(() => this.searchFailed = false),
          catchError(() => {
            this.searchFailed = true;
            return of([]);
          }))
      ),
      tap(() => this.searching = false)
    )


// Mask the passed field to mm/dd/yyyy
  datemask ($event: KeyboardEvent) {
    const cursorKeys = '17;8;46;37;38;39;40;33;34;35;36;45;';
    if (cursorKeys.indexOf($event.keyCode + ';') !== -1) {
      return true;
    }

    const debug = false;
    const target = (<HTMLInputElement>event.target);

    // Verify only valid characters
    const m1 = /([^0-9^\-^\?])$/;

    // Add slash after year
    const m2 = /^([0-9\?]{4})$/;

    // Add slash after month
    const m3 = /^([0-9\?\-]{7})$/;

    // Only allow century 19 and 20
    const m4 = /^([2][^0]|[1][^9]|[\?]{1-2})$/;

    // Only allow months 01-12|??
    const m5b = /^([0-9\?\-]{5}[2-9])$/;
    const m5 = /^([0-9\?\-]{5}[2-9])$/;
    const m5a = /^([0-9\?\-]{5}[1][3-9])$/;

    // Only allow day 01-31
    const m6b = /^([0-9\?\-]{7}\-[4-9])$/;
    const m6 = /^([0-9\?\-]{7}\-[4-9][0-9])$/;
    const m6a = /^([0-9\?\-]{7}\-[3-9][2-9])$/;

    if (m1.test(target.value)) {
      if (debug) {
        alert('m1');
      }
      target.value = target.value.substring(0, target.value.length - 1);
    } else if (m5b.test(target.value)) {
      if (debug) {
        alert('m5b');
      }
      const suffix = target.value.substring(target.value.length - 1);
      const prefix = target.value.substring(0, 5);
      target.value = prefix + '0' + suffix + '-';
    } else if (m5.test(target.value)) {
      if (debug) {
        alert('m5');
      }
      target.value = target.value.substring(0, target.value.length - 1);
    } else if (m5a.test(target.value)) {
      if (debug) {
        alert('m5a');
      }
      target.value = target.value.substring(0, target.value.length - 1);
    } else if (m6b.test(target.value)) {
      if (debug) {
        alert('m6b');
      }
      const suffix = target.value.substring(target.value.length - 1);
      const prefix = target.value.substring(0, 8);
      target.value = prefix + '0' + suffix;
    } else if (m6.test(target.value)) {
      if (debug) {
        alert('m6');
      }
      target.value = target.value.substring(0, target.value.length - 1);
    } else if (m6a.test(target.value)) {
      if (debug) {
        alert('m6a');
      }
      target.value = target.value.substring(0, target.value.length - 1);
    } else if (m2.test(target.value)) {
      if (debug) {
        alert('m2');
      }
      target.value += '-';
    } else if (m3.test(target.value)) {
      if (debug) {
        alert('m3');
      }
      target.value += '-';
    } else if (m4.test(target.value)) {
      if (debug) {
        alert('m4');
      }
      target.value = target.value.substring(0, target.value.length - 1);
    }


    if (target.value.substring(target.value.length - 2) === '\/\/') {
        target.value = target.value.substring(0, target.value.length - 1);
    }

    return true;
  }
}
