import { Component, OnInit } from '@angular/core';
import { ArtistService } from 'src/app/data/service/artist.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Artist } from 'src/app/data/schema/artist';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PerformanceService } from 'src/app/data/service/performance.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-performance-create',
  templateUrl: './performance-create.component.html',
  styleUrls: ['./performance-create.component.css']
})
export class PerformanceCreateComponent implements OnInit {
  public artist: Artist;
  public performanceForm: FormGroup;
  private newPerformanceId: number;
  public validation_messages: any;
  public performanceDateOk = false;
  public venueOk = false;
  public cityOk = false;
  public stateOk = false;

  public performanceDate: string;

  constructor(
    private artistService: ArtistService,
    private performanceService: PerformanceService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(
      queryParams => this.artistService.find(queryParams.artist_id)
          .subscribe( artist => this.artist = artist)
    );

    this.performanceForm = this.formBuilder.group({
      performanceDate: '',
      venue: '',
      city: '',
      state: '',
      set1: '',
      set2: '',
      set3: '',
      description: '',
      title: ''
    });

    this.onChanges();
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
    const post = this.performanceForm.value;
    post.artist = this.artist.id;

    this.performanceService.post(post).subscribe(
      success => {
        this.newPerformanceId = success.id;
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
        this.router.navigate(['/performance/', this.newPerformanceId]);
      }
    );
  }
}
