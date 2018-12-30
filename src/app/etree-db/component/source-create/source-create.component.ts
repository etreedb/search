import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PerformanceService } from '../../../data/service/performance.service';
import { Performance } from '../../../data/schema/performance';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { SourceService } from 'src/app/data/service/source.service';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { ArchiveOrgItemService } from 'src/app/data/service/archive-org-item.service';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-source-create',
  templateUrl: './source-create.component.html',
  styleUrls: ['./source-create.component.css']
})
export class SourceCreateComponent implements OnInit {
  public performance: Performance;
  public sourceForm: FormGroup;
  public newSourceId: number;
  public validation_messages: any;
  public checksums: Array<number> = [];

  public circulationDateOk = false;
  public summaryOk = false;
  public descriptionOk = false;
  public archiveIdentifierOk = false;

  public toggleSource = false;

  constructor(
    private route: ActivatedRoute,
    private performanceService: PerformanceService,
    private sourceService: SourceService,
    private archiveOrgItemService: ArchiveOrgItemService,
    private formBuilder: FormBuilder,
    private router: Router,
    private appComponent: AppComponent
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(
      queryParams => this.performanceService.find(queryParams.performance_id)
          .subscribe( performance => {
            this.performance = performance;

            this.appComponent.setTitle('Create Source for '
              + this.performance._embedded.artist.name
              + ' '
              + this.performance.performanceDate
            );
          },
          (error) => {
            alert('Performance not found');
            this.router.navigate(['/']);
          })
    );

    this.sourceForm = this.formBuilder.group({
      circulationDate: '',
      summary: '',
      description: '',
      archiveIdentifier: '',
      mediaSize: 0,
      mediaSizeUncompressed: 0,
      shnDiscCount: 0,
      wavDiscCount: 0,
    });

    this.onChanges();
    this.addChecksum();
  }

  addChecksum() {
    const newChecksum = Object.keys(this.checksums).length + 1;

    this.sourceForm.addControl('md5name_' + newChecksum, new FormControl());
    this.sourceForm.addControl('md5text_' + newChecksum, new FormControl());
    this.checksums.push(newChecksum);
  }

  removeChecksum() {
    const existingChecksums = Object.keys(this.checksums).length;

    this.sourceForm.removeControl('md5name_' + existingChecksums);
    this.sourceForm.removeControl('md5text_' + existingChecksums);
    this.checksums.splice(-1, 1);
  }

  openArchiveOrgIdentifier() {
    if (! this.archiveIdentifierOk) {
      return;
    }
    window.open(
      'https://archive.org/details/' + this.sourceForm.value.archiveIdentifier
    ).focus();
  }

  onChanges() {
    this.sourceForm.get('circulationDate').valueChanges
      .subscribe( value => this.circulationDateOk = Boolean(value));

    this.sourceForm.get('archiveIdentifier').valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged()
      )
      .subscribe( identifier => {
        this.archiveOrgItemService.metadata(identifier)
          .subscribe( item => this.archiveIdentifierOk = Boolean(item.created && ! item.is_dark));
      });
  }

  onSubmit($event): void {
    const postData = this.sourceForm.value;
    postData.performance = this.performance.id;
    postData.sourceChecksum = [];

    for (let i = 1; i <= this.checksums.length; i ++) {
      postData.sourceChecksum.push({
        'name': postData[`md5name_${i}`],
        'description': postData[`md5text_${i}`]
      });

      delete postData[`md5name_${i}`];
      delete postData[`md5text_${i}`];
    }

    this.sourceService.post(postData).subscribe(
      success => {
        this.newSourceId = success.id;
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
        this.router.navigate(['/source/', this.newSourceId]);
      }
    );
  }
}
