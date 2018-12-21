import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Source } from '../../../data/schema/source';
import { SourceService } from '../../../data/service/source.service';
import { AppComponent } from '../../../app.component';
import { SourceComment } from '../../../data/schema/source-comment';

@Component({
  selector: 'app-source-detail',
  templateUrl: './source-detail.component.html',
  styleUrls: ['./source-detail.component.css']
})
export class SourceDetailComponent implements OnInit {
  public source: Source;
  public sourceComments: Array<SourceComment>;
  public toggleSourceLinksFlag = false;
  public toggleAuditFlag = false;
  public toggleSourceCommentsFlag = false;
  public toggleSourceFlag = false;
  public toggleSourceChecksumFlag = false;
  public toggleUserPerformanceFlag = false;
  public toggleUserPerformancePost = false;

  constructor(
    private route: ActivatedRoute,
    private sourceService: SourceService,
    private appComponent: AppComponent,
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.sourceService.find(+params['id']).subscribe(data => {
        this.source = data;

        this.appComponent
          .setTitle(this.source._embedded.performance._embedded.artist.name
            + ' - '
            + this.source._embedded.performance.performanceDate
            + ' (source ' + this.source.id + ')'
          );
      });
    });
  }
}
