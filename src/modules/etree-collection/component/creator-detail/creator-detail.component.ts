import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppComponent } from '@app/app.component';
import { Location } from '@angular/common';
import { map } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import { Creator } from '@data/schema/creator';
import { HalIdentifier } from '@data/schema/hal-identifier';
import { CreatorService } from '@data/service/creator.service';
import { IdentifierService } from '@data/service/identifier.service';

@Component({
  selector: 'app-creator-detail',
  templateUrl: './creator-detail.component.html',
  styleUrls: ['./creator-detail.component.css']
})
export class CreatorDetailComponent implements OnInit {
  public creator: Creator;
  public halIdentifier: Observable<HalIdentifier>;
  public halOrphans: HalIdentifier;
  public dateAddedHalResponse: HalIdentifier;
  public currentYear = 0;
  public year: Subject<number> = new Subject();

  constructor(
    private creatorService: CreatorService,
    private identifierService: IdentifierService,
    private route: ActivatedRoute,
    private location: Location,
    private appComponent: AppComponent
  ) {
    this.year.subscribe( year => {
      this.halIdentifier = this.identifierService.findByYear(+this.creator.id, year)
      .pipe(map(halIdentifier => {
        this.location.go('creator-detail/' + this.creator.id, '?year=' + year);
        this.appComponent.setTitle('Creator ' + this.creator.name + ' - ' + year);
        this.currentYear = year;

        return halIdentifier;
      }))
      ;
    });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.creatorService.find(+params['id']).subscribe(creator => {
        this.creator = creator;

        const orphans: any = {
          filter: [
            {
              type: 'innerjoin',
              field: 'creator',
              alias: 'creator'
            },
            {
              type: 'eq',
              field: 'id',
              alias: 'creator',
              value: this.creator.id
            },
            {
              type: 'leftjoin',
              field: 'source',
              alias: 'source'
            },
            {
              type: 'isnull',
              field: 'id',
              alias: 'source'
            }
          ]
        };
        this.identifierService.query(orphans)
          .subscribe( halResponse => this.halOrphans = halResponse);

        const dateAddedParams = {
          filter: [
            {
              type: 'innerjoin',
              field: 'creator',
              alias: 'creator'
            },
            {
              type: 'eq',
              field: 'id',
              alias: 'creator',
              value: this.creator.id
            },
          ],
          'order-by': [
            {
              type: 'field',
              field: 'addedAt',
              direction: 'desc'
            }
          ]
        };
        this.identifierService.query(dateAddedParams)
          .subscribe( halResponse => this.dateAddedHalResponse = halResponse);

        this.route.queryParams.subscribe(qparams => {
          let currentYear = +qparams['year'];

          if (! currentYear) {
            currentYear = creator._computed.years[creator._computed.years.length - 1];
          }

          this.year.next(currentYear);
         });
       });
     });
  }

}
