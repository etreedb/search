import { Component, OnInit } from '@angular/core';
import { SourceAdminLayoutComponent } from '@app/layout/source-admin-layout/source-admin-layout.component';
import { SourceService } from '@modules/data/service/source.service';
import { HalSource } from '@modules/data/schema/hal-source';
import { SourceCommentService } from '@modules/data/service/source-comment.service';
import { HalSourceComment } from '@modules/data/schema/hal-source-comment';
import { ActivatedRoute, Router } from '@angular/router';
import { ArtistGroupService } from '@modules/data/service/artist-group.service';
import { OAuthService } from 'angular-oauth2-oidc';
import { User } from '@modules/data/schema/user';
import { plainToClass } from 'class-transformer';
import { Subject } from 'rxjs';
import { Artist } from '@modules/data/schema/artist';
import { HalArtistGroup } from '@modules/data/schema/hal-artist-group';
import { HalLink } from '@modules/data/schema/hal-link';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  public recentSources: HalSource;
  public recentSourceComments: HalSourceComment;
  public user: User;
  public artist: Subject<Artist>;
  public halArtistGroup: HalArtistGroup;

  constructor(
    private sourceAdminLayout: SourceAdminLayoutComponent,
    private artistGroupService: ArtistGroupService,
    private sourceService: SourceService,
    private sourceCommentService: SourceCommentService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private oauthService: OAuthService
  ) {
    this.artist = new Subject();
  }

  ngOnInit() {
    this.user = plainToClass(User, this.oauthService.getIdentityClaims());

    this.activatedRoute.queryParams.subscribe(queryParams => {
      this.artistGroupService.findByUser(this.user)
        .subscribe(data => {
          this.halArtistGroup = data;

          if (! queryParams.artist_id) {
            this.artist.next(data._embedded.artist_group[0]._embedded.artist[0]);
          }

          data._embedded.artist_group.forEach(group => {
            group._embedded.artist.forEach(artist => {
              if (artist.id === queryParams.artist_id) {
                this.artist.next(artist);
              }
            });
          });
      });
    });

    this.artist.subscribe(artist => {
      this.recentSources = null;
      this.recentSourceComments = null;
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

  public updateArtist($event) {
    this.router.navigate(['.'], {
      relativeTo: this.activatedRoute,
      queryParams: {
        artist_id: $event.target.value
      }
    });
  }

  public loadRecentSourcesLink(link: HalLink) {
    this.sourceService.loadLink(link).subscribe(
      data => this.recentSources = data
    );
  }

  public loadRecentSourceCommentsLink(link: HalLink) {
    this.sourceCommentService.loadLink(link).subscribe(
      data => this.recentSourceComments = data
    );
  }
}
