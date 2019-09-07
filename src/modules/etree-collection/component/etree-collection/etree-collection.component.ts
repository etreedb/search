import { Component, OnInit } from '@angular/core';
import { IdentifierService } from '@data/service/identifier.service';
import { HalIdentifier } from '@data/schema/hal-identifier';
import { Subject, of, Observable } from 'rxjs';
import { Location } from '@angular/common';
import { AppComponent } from '@app/app.component';
import { CreatorService } from '@data/service/creator.service';
import { HalCreator } from '@data/schema/hal-creator';
import { ActivatedRoute } from '@angular/router';
import { HalLink } from '@data/schema/hal-link';
import { debounceTime, distinctUntilChanged, switchMap, catchError } from 'rxjs/operators';

@Component({
  selector: 'app-etree-collection',
  templateUrl: './etree-collection.component.html',
  styleUrls: ['./etree-collection.component.css']
})
export class EtreeCollectionComponent implements OnInit {
  public dateAddedHalResponse: HalIdentifier;
  protected searchString: Subject<string>;
  public halCreator: HalCreator;
  public currentSearch: string;
  public freetextSearch: string;

  constructor(
    private identifierService: IdentifierService,
    private location: Location,
    private appComponent: AppComponent,
    private creatorService: CreatorService,
    private route: ActivatedRoute
  ) {
    this.appComponent.setTitle('The etree Collection');

    this.searchString = new Subject();
    this.searchString.subscribe(search => {
      this.location.go('/etree-collection', '?search=' + encodeURI(search));
      this.appComponent.setTitle('Search Creators matching "' + search + '"');

      this.creatorService.searchByLetter(search)
        .subscribe(halCreator => this.halCreator = halCreator);

      this.currentSearch = search.replace('%', '');
    });
  }

  ngOnInit() {
    this.route.queryParams.subscribe(queryParams => {
      if (queryParams.search) {
        this.searchString.next(queryParams.search);
      }
    });

    const params = {
      'order-by': [
        {
          type: 'field',
          field: 'addedAt',
          direction: 'desc'
        }
      ]
    };
    this.identifierService.query(params)
      .subscribe( halResponse => this.dateAddedHalResponse = halResponse);
  }

  alphabet(): Array<string> {
    const alphabet: Array<string> = [];

    for (let i = 65; i <= 90; i++) {
      alphabet.push(String.fromCharCode(i));
    }

    return alphabet;
  }

  search(search) {
    this.searchString.next(search);
  }

  submitSearch($event): void {
    if ($event.keyCode === 13) {
      this.searchString.next('%' + this.freetextSearch);
    }
  }

  loadLink(halLink: HalLink): void {
    this.creatorService.loadLink(halLink)
      .subscribe(halCreator => this.halCreator = halCreator);
  }

  lookup = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(term =>
        this.creatorService.lookup(term).pipe(
          catchError(() => {
            return of([]);
          }))
      )
    )
}
