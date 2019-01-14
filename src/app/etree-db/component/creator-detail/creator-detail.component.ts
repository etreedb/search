import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppComponent } from '../../../app.component';
import { HalPerformance } from '../../../data/schema/hal-performance';
import { Location } from '@angular/common';
import { map } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import { Creator } from 'src/app/data/schema/creator';
import { HalIdentifier } from 'src/app/data/schema/hal-identifier';
import { CreatorService } from 'src/app/data/service/creator.service';
import { IdentifierService } from 'src/app/data/service/identifier.service';

@Component({
  selector: 'app-creator-detail',
  templateUrl: './creator-detail.component.html',
  styleUrls: ['./creator-detail.component.css']
})
export class CreatorDetailComponent implements OnInit {
  public creator: Creator;
  public halIdentifier: Observable<HalIdentifier>;
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
