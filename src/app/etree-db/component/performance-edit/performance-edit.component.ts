import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Performance } from 'src/app/data/schema/performance';
import { ActivatedRoute, Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { PerformanceService } from 'src/app/data/service/performance.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-performance-edit',
  templateUrl: './performance-edit.component.html',
  styleUrls: ['./performance-edit.component.css']
})
export class PerformanceEditComponent implements OnInit {
  public performance: Performance;
  public performanceForm: FormGroup;
  public validation_messages: any;
  public performanceCorrection: any;

  public performanceDate = '';
  public performanceDateOk = true;
  public venueOk = true;
  public cityOk = true;
  public stateOk = true;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private appComponent: AppComponent,
    private performanceService: PerformanceService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(
      routeParams => this.performanceService.find(routeParams.id)
        .subscribe( performance => {

          this.appComponent.setTitle('Edit Performance for '
            + performance._embedded.artist.name
            + ' '
            + performance.performanceDate
          );

          if (performance._computed) {
            const performanceCorrection = performance._computed.performanceCorrection;
          } else {
            const performanceCorrection = [];
          }

          this.performanceForm = this.formBuilder.group({
            performanceDate: (performanceCorrection.performanceDate) ?
              performanceCorrection.performanceDate : performance.performanceDate,
            venue: (performanceCorrection.venue) ?
              performanceCorrection.venue : performance.venue,
            city: (performanceCorrection.city) ?
              performanceCorrection.city : performance.city,
            state: (performanceCorrection.state) ?
              performanceCorrection.state : performance.state,
            set1: (performanceCorrection.set1) ?
              performanceCorrection.set1 : performance.set1,
            set2: (performanceCorrection.set2) ?
              performanceCorrection.set2 : performance.set2,
            set3: (performanceCorrection.set3) ?
              performanceCorrection.set3 : performance.set3,
            description: (performanceCorrection.description) ?
              performanceCorrection.description : performance.description,
            title: (performanceCorrection.title) ?
              performanceCorrection.title : performance.title
          });

          this.performanceDate = (performanceCorrection.performanceDate) ?
            performanceCorrection.performanceDate : performance.performanceDate,

          this.performance = performance;
          this.performanceCorrection = performanceCorrection;

          this.onChanges();
        }
      )
    );
  }

  onChanges() {
    const uriPattern = /^[0-9\?]{4}-[0-9\?]{2}-[0-9\?]{2}$/;
    this.performanceForm.get('performanceDate').valueChanges
      .subscribe( value => this.performanceDateOk = uriPattern.test(value));

    this.performanceForm.get('venue').valueChanges
      .subscribe( value => this.venueOk = Boolean(value));

    this.performanceForm.get('city').valueChanges
      .subscribe( value => this.cityOk = Boolean(value));

    this.performanceForm.get('state').valueChanges
      .subscribe( value => this.stateOk = Boolean(value));
  }

  onSubmit($event): void {
    const patchData = this.performanceForm.value;

    this.performanceService.patch(this.performance.id, patchData).subscribe(
      success => {
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
        this.router.navigate(['/performance/', this.performance.id]);
      }
    );
  }
}
