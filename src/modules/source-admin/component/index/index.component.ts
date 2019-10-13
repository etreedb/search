import { Component, OnInit } from '@angular/core';
import { SourceService } from '@modules/data/service/source.service';
import { HalSource } from '@modules/data/schema/hal-source';
import { SourceCommentService } from '@modules/data/service/source-comment.service';
import { HalSourceComment } from '@modules/data/schema/hal-source-comment';
import { ActivatedRoute, Router } from '@angular/router';
import { ArtistGroupService } from '@modules/data/service/artist-group.service';
import { OAuthService } from 'angular-oauth2-oidc';
import { User } from '@modules/data/schema/user';
import { plainToClass } from 'class-transformer';
import { Subject, Observable } from 'rxjs';
import { Artist } from '@modules/data/schema/artist';
import { HalArtistGroup } from '@modules/data/schema/hal-artist-group';
import { HalLink } from '@modules/data/schema/hal-link';
import { ArtistGroup } from '@modules/data/schema/artist-group';
import { UserService } from '@modules/data/service/user.service';
import { ArtistService } from '@modules/data/service/artist.service';
import { map, distinctUntilChanged, refCount, publishReplay } from 'rxjs/operators';
import { Location } from '@angular/common';
import { AppComponent } from '@app/app.component';
import { SourceAdminLayoutComponent } from '@app/layout/source-admin-layout/source-admin-layout.component';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  public user: User;
  public artist: Artist;
  public artistGroup: ArtistGroup;
  public artistGroup$: Subject<ArtistGroup>;
  public halArtistGroup2$: Observable<HalArtistGroup>;
  public pendingSourceCount$: Observable<number>;
  public totalPendingSourceCount$: Observable<number>;
  public recentSources$: Observable<HalSource>;
  public recentSourceComments$: Observable<HalSourceComment>;

  constructor(
    private artistGroupService: ArtistGroupService,
    private userService: UserService,
    private artistService: ArtistService,
    private sourceService: SourceService,
    private sourceCommentService: SourceCommentService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private oauthService: OAuthService,
    private location: Location,
    private appComponent: AppComponent,
    private sourceAdminLayoutComponent: SourceAdminLayoutComponent
  ) {
    this.halArtistGroup2$ = new Observable();
    this.artistGroup$ = new Subject();
    this.recentSources$ = new Observable();
    this.pendingSourceCount$ = new Observable();
    this.totalPendingSourceCount$ = new Observable();
    this.recentSourceComments$ = new Observable();

    this.user = plainToClass(User, this.oauthService.getIdentityClaims());

    this.artistGroup$.pipe(
      distinctUntilChanged()
    ).subscribe(artistGroup => {
      this.artistGroup = artistGroup;

      this.appComponent.setTitle('Source Admin: ' + artistGroup.title);

      const query = {
        filter: [
          {
            type: 'innerjoin',
            field: 'performance',
            alias: 'performance'
          },
          {
            type: 'innerjoin',
            field: 'artist',
            alias: 'artist',
            parentAlias: 'performance'
          },
          {
            type: 'innerjoin',
            field: 'artistGroup',
            alias: 'artistGroup',
            parentAlias: 'artist'
          },
          {
            type: 'innerjoin',
            field: 'user',
            alias: 'user',
            parentAlias: 'artistGroup'
          },
          {
            type: 'eq',
            field: 'id',
            alias: 'user',
            value: this.user.id
          },
          {
            type: 'eq',
            field: 'id',
            alias: 'artistGroup',
            value: artistGroup.id
          },
          {
            type: 'eq',
            field: 'isApproved',
            value: 0
          }
        ]
      };

      this.pendingSourceCount$ = this.sourceService.findBy(query).pipe(
        map(halSource => halSource.total_items)
      );

      const totalQuery = {
        filter: [
          {
            type: 'innerjoin',
            field: 'performance',
            alias: 'performance'
          },
          {
            type: 'innerjoin',
            field: 'artist',
            alias: 'artist',
            parentAlias: 'performance'
          },
          {
            type: 'innerjoin',
            field: 'artistGroup',
            alias: 'artistGroup',
            parentAlias: 'artist'
          },
          {
            type: 'innerjoin',
            field: 'user',
            alias: 'user',
            parentAlias: 'artistGroup'
          },
          {
            type: 'eq',
            field: 'id',
            alias: 'user',
            value: this.user.id
          },
          {
            type: 'eq',
            field: 'isApproved',
            value: 0
          }
        ]
      };

      this.totalPendingSourceCount$ = this.sourceService.findBy(totalQuery).pipe(
        map(halSource => halSource.total_items)
      );

      const recentSourcesQuery = {
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
            type: 'innerjoin',
            field: 'artistGroup',
            parentAlias: 'artist',
            alias: 'artistGroup'
          },
          {
            type: 'eq',
            field: 'id',
            alias: 'artistGroup',
            value: artistGroup.id
          }
        ],
        'order-by': [
          {
            type: 'field',
            field: 'lastUpdateAt',
            direction: 'desc'
          }
        ],
        page: 1,
        limit: 10
      };

      this.recentSources$ = this.sourceService.findBy(recentSourcesQuery);

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
            type: 'innerjoin',
            field: 'artistGroup',
            parentAlias: 'artist',
            alias: 'artistGroup'
          },
          {
            type: 'eq',
            field: 'id',
            alias: 'artistGroup',
            value: artistGroup.id
          }
        ],
        'order-by': [
          {
            type: 'field',
            field: 'createdAt',
            direction: 'desc'
          }
        ],
        page: 1,
        limit: 10
      };

      this.recentSourceComments$ = this.sourceCommentService.findBy(sourceCommentQuery);
    });
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.halArtistGroup2$ = this.artistGroupService.findByUser(this.user).pipe(
        publishReplay(1),
        refCount(),
        map(halArtistGroup => {
          let foundArtist = false;

          // If no valid artist select first and reload
          if (! params.artist_id || parseInt(params.artist_id, 10) === 0) {
            this.router.navigate([
              '/source-admin/index',
              halArtistGroup._embedded.artist_group[0]._embedded.artist[0].id
            ]);
          }

          // Find the current artist within the artist groups
          halArtistGroup._embedded.artist_group.forEach(group => {
            group._embedded.artist.forEach(artist => {
              if (artist.id === params.artist_id) {
                this.artist = artist;
                this.sourceAdminLayoutComponent.artistId = artist.id;
                this.artistGroup$.next(group);
                foundArtist = true;
              }
            });
          });

          if (foundArtist) {
            return halArtistGroup;
          }

          // If the artist is not found check if user has admin permissions
          if (! foundArtist && this.userService.hasRole(this.user, 'admin')) {
            // User is admin and should have access to all artists
            this.artistService.find(params.artist_id).subscribe(artist => {

              // Change to new artist group
              this.halArtistGroup2$ =
              this.artistGroupService.findByUrl(artist._embedded.artistGroup._links.self.href)
                .pipe(
                  publishReplay(1),
                  refCount(),
                  map(artistHalArtistGroup => {
                    artistHalArtistGroup._embedded.artist_group.forEach(group => {
                      group._embedded.artist.forEach(groupedArtist => {
                        if (groupedArtist.id === params.artist_id) {
                          this.artist = groupedArtist;
                          this.sourceAdminLayoutComponent.artistId = artist.id;
                          this.artistGroup$.next(group);

                          return artistHalArtistGroup;
                        }
                      });
                    });

                    return artistHalArtistGroup;
                  })
                );
              });
          }

          return halArtistGroup;
        })
      );
    });
  }

  public loadRecentSourcesLink(link: HalLink) {
    this.recentSources$ = this.sourceService.loadLink(link);
  }

  public loadRecentSourceCommentsLink(link: HalLink) {
    this.recentSourceComments$ = this.sourceCommentService.loadLink(link);
  }

  public nextArtist(artistId) {
    this.halArtistGroup2$.subscribe(halArtistGroup => {
      halArtistGroup._embedded.artist_group.forEach(group => {
        group._embedded.artist.forEach(artist => {
          if (artist.id === artistId) {
            this.artist = artist;
            this.sourceAdminLayoutComponent.artistId = artist.id;
            this.artistGroup$.next(group);
          }
        });
      });
    });

    this.location.replaceState('/source-admin/index/' + artistId);
  }
}
