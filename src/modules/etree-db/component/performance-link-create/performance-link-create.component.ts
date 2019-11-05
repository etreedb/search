import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PerformanceService } from '@modules/data/service/performance.service';
import { Performance } from '@modules/data/schema/performance';
import { HalLink } from '@modules/data/schema/hal-link';
import { environment } from '@env';
import * as $ from 'jquery';
import { PerformanceLinkService } from '@modules/data/service/performance-link.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-performance-link-create',
  templateUrl: './performance-link-create.component.html',
  styleUrls: ['./performance-link-create.component.css']
})
export class PerformanceLinkCreateComponent implements OnInit {
  public performance: Performance;
  public performanceLinkLink: HalLink;
  public validation_messages: any;
  public linkName: string;
  public url: string;

  constructor(
    private route: ActivatedRoute,
    private performanceService: PerformanceService,
    private performanceLinkService: PerformanceLinkService
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(
      queryParams => {
        this.performanceService.find(queryParams['performance_id'])
          .subscribe(performance => {
            this.performance = performance;

            const performanceLinkQueryParams: any = {
              'filter': [
                {
                  field: 'performance',
                  type: 'eq',
                  value: this.performance.id
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
            this.performanceLinkLink = {
              href: environment.apiUrl + '/performance-link?' + $.param(performanceLinkQueryParams)
            };
          });
      });
  }

  onSubmit() {
    const formData = new FormData();
    this.validation_messages = null;
    formData.append('name', this.linkName);
    formData.append('url', this.url);
    formData.append('performance', String(this.performance.id));

    this.performanceLinkService.post(formData)
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
