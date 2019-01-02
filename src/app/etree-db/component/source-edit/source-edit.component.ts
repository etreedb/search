import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { SourceService } from 'src/app/data/service/source.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Source } from 'src/app/data/schema/source';
import { ArchiveOrgItemService } from 'src/app/data/service/archive-org-item.service';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { SourceChecksumService } from 'src/app/data/service/source-checksum.service';
import { HalSourceChecksum } from 'src/app/data/schema/hal-source-checksum';
import { SourceChecksum } from 'src/app/data/schema/source-checksum';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-source-edit',
  templateUrl: './source-edit.component.html',
  styleUrls: ['./source-edit.component.css']
})
export class SourceEditComponent implements OnInit {
  public source: Source;
  public sourceForm: FormGroup;
  public validation_messages: any;
  public checksums: Array<number> = [];
  public halSourceChecksum: HalSourceChecksum;
  public toggleSource = false;

  public circulationDateOk = false;
  public summaryOk = false;
  public descriptionOk = false;
  public archiveIdentifierOk = false;

  constructor(
    private appComponent: AppComponent,
    private sourceService: SourceService,
    private sourceChecksumService: SourceChecksumService,
    private route: ActivatedRoute,
    private router: Router,
    private archiveOrgItemService: ArchiveOrgItemService,
    private formBuilder: FormBuilder
  ) {
  }

  ngOnInit() {
    this.route.params.subscribe( params => {
      this.sourceService.find(params.id).subscribe(source => {
console.log(source);

        // Load before checksums
        this.sourceForm = this.formBuilder.group({
          circulationDate: source.circulationDate,
          summary: source.summary,
          description: source.description,
          archiveIdentifier: source.archiveIdentifier,
          mediaSize: source.mediaSize,
          mediaSizeUncompressed: source.mediaSizeUncompressed,
          shnDiscCount: source.shnDiscCount,
          wavDiscCount: source.wavDiscCount
        });

        this.sourceChecksumService
          .loadLink(source._embedded.sourceChecksum._links.self)
            .subscribe(halSourceChecksum => {
              this.halSourceChecksum = halSourceChecksum;

              this.halSourceChecksum._embedded.source_checksum
                .forEach( sourceChecksum => this.addChecksum(sourceChecksum));
            });

        this.appComponent.setTitle('Edit Source for '
          + source._embedded.performance._embedded.artist.name
          + ' '
          + source._embedded.performance.performanceDate
          + ' ('
          + source.id
          + ')'
        );

        this.onChanges();
        this.source = source;
      });
    });

  }

  addChecksum(sourceChecksum?: SourceChecksum): void {
    const newChecksum = Object.keys(this.checksums).length + 1;

    this.sourceForm.addControl('md5id_' + newChecksum, new FormControl());
    this.sourceForm.addControl('md5name_' + newChecksum, new FormControl());
    this.sourceForm.addControl('md5text_' + newChecksum, new FormControl());

    if (sourceChecksum) {
      this.sourceForm.get('md5id_' + newChecksum).setValue(sourceChecksum.id);
      this.sourceForm.get('md5name_' + newChecksum).setValue(sourceChecksum.name);
      this.sourceForm.get('md5text_' + newChecksum).setValue(sourceChecksum.description);
    }
    this.checksums.push(newChecksum);
  }

  removeChecksum(): void {
    const existingChecksums = Object.keys(this.checksums).length;

    this.sourceForm.removeControl('md5id_' + existingChecksums);
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

      this.sourceForm.get('circulationDate').updateValueAndValidity();
      this.sourceForm.get('archiveIdentifier').updateValueAndValidity();
    }

  onSubmit($event): void {
    const patchData = this.sourceForm.value;
    patchData.performance = this.source._embedded.performance.id;
    patchData.sourceChecksum = [];

    for (let i = 1; i <= this.checksums.length; i ++) {
      const sourceChecksum: SourceChecksum = new SourceChecksum();
      sourceChecksum.id = patchData[`md5id_${i}`];
      sourceChecksum.name = patchData[`md5name_${i}`];
      sourceChecksum.description = patchData[`md5text_${i}`];

      patchData.sourceChecksum.push(sourceChecksum);

      delete patchData[`md5id_${i}`];
      delete patchData[`md5name_${i}`];
      delete patchData[`md5text_${i}`];
    }

    this.sourceService.patch(this.source.id, patchData).subscribe(
      success => {
      },
      (error: HttpErrorResponse) => {
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
        this.router.navigate(['/source/', this.source.id]);
      }
    );
  }
}
