import { Component, OnInit } from '@angular/core';
import { ArtistService } from '../../artist.service';
import {Observable, of} from 'rxjs';
import {catchError, debounceTime, distinctUntilChanged, map, tap, switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-artist-lookup',
  templateUrl: './artist-lookup.component.html',
  styleUrls: ['./artist-lookup.component.css']
})
export class ArtistLookupComponent implements OnInit {
  public name: any;
  public performanceDate: any;
  public searching = false;
  public searchFailed = false;

  constructor(
    private artistService: ArtistService,
  ) { }

  ngOnInit() {
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
    const mA = /([^0-9^\/^\?])$/;

    // Check for question mark only
    const m0 = /(^\?$)/;

    // Check for day question mark
    const m0a = /^.{2}\/\?$/;

    // Check for day question mark
    const m0b = /^.{2}\/.\?$/;

    // Check for Mar-Dec date
    const m1 = /(^[2-9]$)|(^1\/$)/;

    // Check for invalid month
    const m2 = /^[1-2][3-9]$/;

    // If valid month, advance
    const m3a = /^[0][0]$/;

    // If valid month, advance
    const m3 = /(^[0-1][0-9]$)|(^[1-9]\/$)/;

    // Check for day < 10
    const m4 = /(^[0-1][0-9]\/[4-9]$)|(^[0-1][0-9]\/[1-9]\/$)/;

    // Check for day > 10
    const m4a = /^.{5}$/;

    // Check for invalid day
    const m5 = /^[0-1?][0-9?]\/[4-9][0-9]$/;

    // Verify date < 32
    const m6 = /^[0-1?][0-9?]\/[3-9][2-9]$/;

    const m7a = /^[0-1?][0-9?]\/[0]{2}$/;
    const m7 = /^[0-1?][0-9?]\/[0-3][0-9][\/]$/;

    // Prepend 20 to year
    const m8 = /^[0-1?][0-9?]\/[0-3?][0-9?]\/([0][0-9]|[1][0-8])$/;

    // Prepend 19 to year
    const m9 = /^[0-1?][0-9?]\/[0-3?][0-9?]\/([03-9][0-9])$/;


    if (mA.test(target.value)) {
      if (debug) {
        alert('mA');
      }
      target.value = target.value.substring(0, target.value.length - 1);
    } else if (m0.test(target.value)) {
      if (debug) {
        alert('m0');
      }
      target.value = '?' + target.value.substring(0, 1) + '/';
    } else if (m0a.test(target.value)) {
      if (debug) {
        alert('m0a');
      }
      target.value = target.value + '?/';
    } else if (m0b.test(target.value)) {
      if (debug) {
        alert('m0b');
      }
      target.value = target.value + '/';
    } else if (m1.test(target.value)) {
      if (debug) {
        alert('m1');
      }
      target.value = '0' + target.value.substring(0, 1) + '/';
    } else if (m2.test(target.value)) {
      if (debug) {
        alert('m2');
      }
      target.value = '1';
    } else if (m3a.test(target.value)) {
      if (debug) {
        alert('m3a');
      }
      target.value = target.value.substr(0, 1);
    } else if (m3.test(target.value)) {
      if (debug) {
        alert('m3');
      }
      target.value = target.value + '/';
    } else if (m4.test(target.value)) {
      if (debug) {
        alert('m4');
      }
      target.value = target.value.substring(0, 3) + '0'
        + target.value.substring(3) + '/';
      } else if (m4a.test(target.value)) {
        if (debug) {
          alert('m4a');
        }
        target.value = target.value + '/';
      } else if (m5.test(target.value)) {
      if (debug) {
        alert('m5');
      }
      target.value = target.value.substring(0, 3);
    } else if (m6.test(target.value)) {
      if (debug) {
        alert('m6');
      }
      target.value = target.value.substring(0, 4);
    } else if (m7a.test(target.value)) {
      if (debug) {
        alert('m7a');
      }
      target.value = target.value.substring(0, 4);
    } else if (m7.test(target.value)) {
      if (debug) {
        alert('m7');
      }
      target.value = target.value + '/';
    } else if (m8.test(target.value)) {
      if (debug) {
        alert('m8');
      }
      target.value = target.value.substring(0, 6) + '20' + target.value.substring(6);
    } else if (m9.test(target.value)) {
      if (debug) {
        alert('m9');
      }
      target.value = target.value.substring(0, 6) + '19' + target.value.substring(6);
    }

    if (target.value.substring(target.value.length - 2) === '\/\/') {
        target.value = target.value.substring(0, target.value.length - 1);
    }

    return true;
  }
}
