import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PerformanceService } from '@modules/data/service/performance.service';
import { Performance } from '@modules/data/schema/performance';
import { HalLink } from '@modules/data/schema/hal-link';
import { environment } from '@env';
import * as $ from 'jquery';
import { PerformanceLinkService } from '@modules/data/service/performance-link.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Source } from '@modules/data/schema/source';
import { SourceLinkService } from '@modules/data/service/source-link.service';
import { SourceService } from '@modules/data/service/source.service';

@Component({
  selector: 'app-source-link-create',
  templateUrl: './source-link-create.component.html',
  styleUrls: ['./source-link-create.component.css']
})
export class SourceLinkCreateComponent implements OnInit {
  public source: Source;
  public sourceLinkLink: HalLink;
  public validation_messages: any;
  public linkName: string;
  public url: string;

  constructor(
    private route: ActivatedRoute,
    private sourceService: SourceService,
    private sourceLinkService: SourceLinkService
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(
      queryParams => {
        this.sourceService.find(queryParams['source_id'])
          .subscribe(source => {
            this.source = source;

            const sourceLinkQueryParams: any = {
              'filter': [
                {
                  field: 'source',
                  type: 'eq',
                  value: this.source.id
                }
              ],
              'order-by': [
                {
                  field: 'id',
                  type: 'field',
                  direction: 'desc'
                }
              ]
            };
            this.sourceLinkLink = {
              href: environment.apiUrl + '/source-link?' + $.param(sourceLinkQueryParams)
            };
          });
      });
  }

  onSubmit() {
    const formData = new FormData();
    this.validation_messages = null;
    formData.append('name', this.linkName);
    formData.append('url', this.url);
    formData.append('source', String(this.source.id));

    this.sourceLinkService.post(formData)
      .subscribe(
        success => {
          window.location.reload();
        },
        (error: HttpErrorResponse) => {
          switch (error.status) {
            case 422:
              this.validation_messages = error.error.validation_messages;
              break;
            default:
              alert('There was an error saving your link.');
              console.log(error);
          }
        }
    );
  }
}
