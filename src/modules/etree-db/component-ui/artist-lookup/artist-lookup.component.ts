import { Component, OnInit } from '@angular/core';
import { ArtistService } from '@data/service/artist.service';
import { GraphqlService } from '@data/service/graphql.service';
import {Observable, of} from 'rxjs';
import {catchError, debounceTime, distinctUntilChanged, map, tap, switchMap} from 'rxjs/operators';

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

  public result: Array<any>;
  public resultNotFound = false;

  constructor(
    private artistService: ArtistService,
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

    // Escape quotes
    const name = this.name.replace(/\\([\s\S])|(")/g, '\\$1$2');

    this.graphqlService.query(`{
      artist (filter:{name:"${name}"}) {
        id
        name
        performance (filter:{performanceDate:"${this.performanceDate}"}) {
          id performanceDate venue city state year
        }
      }
    }`).subscribe(data  => {
      if (data.data && data.data.artist[0].performance.length) {
        this.result = [];

        data.data.artist[0].performance.forEach(row => {
          this.result.push({
            id: row.id,
            name: data.data.artist[0].name,
            artist_id: data.data.artist[0].id,
            performanceDate: row.performanceDate,
            venue: row.venue,
            city: row.city,
            state: row.state,
            year: row.year
          });
        });
      } else {
        this.resultNotFound = true;
        console.log(data);
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
}
