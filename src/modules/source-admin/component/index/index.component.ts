import { Component, OnInit } from '@angular/core';
import { SourceAdminLayoutComponent } from '@app/layout/source-admin-layout/source-admin-layout.component';
import { SourceService } from '@modules/data/service/source.service';
import { HalSource } from '@modules/data/schema/hal-source';
import { SourceCommentService } from '@modules/data/service/source-comment.service';
import { HalSourceComment } from '@modules/data/schema/hal-source-comment';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  public recentSources: HalSource;
  public recentSourceComments: HalSourceComment;

  constructor(
    private sourceAdminLayout: SourceAdminLayoutComponent,
    private sourceService: SourceService,
    private sourceCommentService: SourceCommentService
  ) { }

  ngOnInit() {
    this.sourceAdminLayout.artist.subscribe(artist => {
      this.recentSources = null;
      const query = {
        filter: [
          {
            type: 'innerjoin',
            field: 'performance',
            alias: 'performance'
          },
          {
            type: 'innerjoin',
            parentAlias: 'performance',
            field: 'artist',
            alias: 'artist'
          },
          {
            type: 'eq',
            field: 'id',
            alias: 'artist',
            value: artist.id
          }
        ],
        'order-by': [
          {
            type: 'field',
            field: 'lastUpdateAt',
            direction: 'asc'
          }
        ],
        page: 1,
        limit: 10
      };

      this.sourceService.findBy(query)
        .subscribe(data => this.recentSources = data);

      const sourceCommentQuery = {
        filter: [
          {
            type: 'innerjoin',
            field: 'source',
            alias: 'source'
          },
          {
            type: 'innerjoin',
            field: 'performance',
            alias: 'performance',
            parentAlias: 'source'
          },
          {
            type: 'innerjoin',
            parentAlias: 'performance',
            field: 'artist',
            alias: 'artist'
          },
          {
            type: 'eq',
            field: 'id',
            alias: 'artist',
            value: artist.id
          }
        ],
        'order-by': [
          {
            type: 'field',
            field: 'createdAt',
            direction: 'asc'
          }
        ],
        page: 1,
        limit: 10
      };

      this.sourceCommentService.findBy(sourceCommentQuery)
        .subscribe(data => this.recentSourceComments = data);
    });
  }
}
