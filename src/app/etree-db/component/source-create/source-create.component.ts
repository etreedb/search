import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PerformanceService } from '../../../data/service/performance.service';
import { Performance } from '../../../data/schema/performance';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { SourceService } from 'src/app/data/service/source.service';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { ArchiveOrgItemService } from 'src/app/data/service/archive-org-item.service';

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
    private router: Router
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(
      queryParams => this.performanceService.find(queryParams.performance_id)
          .subscribe( performance => this.performance = performance)
    );

    this.sourceForm = this.formBuilder.group({
      circulationDate: '',
      summary: '',
      description: '',
      archiveIdentifier: '',
      mediaSize: 0,
      mediaSizeUncompressed: 0,
      shnDiscCount: 0,
      wavDiscCount: 0
    });

    this.onChanges();
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
    const post = this.sourceForm.value;
    post.performance = this.performance.id;

    this.sourceService.post(post).subscribe(
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
