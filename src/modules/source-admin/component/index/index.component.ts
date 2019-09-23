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
import { map, distinctUntilChanged, take } from 'rxjs/operators';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  public user: User;
  public artist$: Subject<Artist>;
  public artist: Artist;
  public artistGroup: ArtistGroup;
  public artistGroup$: Subject<ArtistGroup>;
  public halArtistGroup: HalArtistGroup;
  public halArtistGroup$: Subject<HalArtistGroup>;
  public pendingSourceCount$: Observable<number>;
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
    private oauthService: OAuthService
  ) {
    this.artist$ = new Subject();
    this.halArtistGroup$ = new Subject();
    this.artistGroup$ = new Subject();
    this.recentSources$ = new Observable();
    this.pendingSourceCount$ = new Observable();
    this.recentSourceComments$ = new Observable();

    this.user = plainToClass(User, this.oauthService.getIdentityClaims());

    this.artistGroup$.pipe(
      distinctUntilChanged()
    ).subscribe(artistGroup => {
      this.artistGroup = artistGroup;

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

    this.artist$.subscribe(artist => this.artist = artist);
    this.halArtistGroup$
      .subscribe(halArtistGroup => this.halArtistGroup = halArtistGroup);
  }

  ngOnInit() {

    this.activatedRoute.params.subscribe(params => {
      // If the artist groups are already loaded do not try to reload
        if (this.halArtistGroup) {
          this.halArtistGroup._embedded.artist_group.forEach(group => {
            group._embedded.artist.forEach(artist => {
              if (artist.id === params.artist_id) {
                this.artistGroup$.next(group);
                this.artist$.next(artist);
              }
            });
          });
        } else {
          // Load this users artist groups
          this.artistGroupService.findByUser(this.user)
            .subscribe(data => {
              if (! params.artist_id || parseInt(params.artist_id, 10) === 0) {
                this.router.navigate([
                  '/source-admin/index',
                  data._embedded.artist_group[0]._embedded.artist[0].id
                ]);
              }

              // Find the artist and group within the user's permitted artist groups
              data._embedded.artist_group.forEach(group => {
                group._embedded.artist.forEach(artist => {
                  if (artist.id === params.artist_id) {
                    this.artistGroup$.next(group);
                    this.halArtistGroup$.next(data);
                    this.artist$.next(artist);
                  }
                });
              });

              // If the artist is not found check if user has admin permissions
              if (! this.artist && params.artist_id > 0) {
                if (this.userService.hasRole(this.user, 'admin')) {
                  // User is admin and should have access to all artists
                  this.artistService.find(params.artist_id).subscribe(artist => {
                    this.artistGroupService.findByUrl(artist._embedded.artistGroup._links.self.href)
                      .subscribe(halArtistGroup => {
                        halArtistGroup._embedded.artist_group.forEach(group => {
                          group._embedded.artist.forEach(groupedArtist => {
                            if (groupedArtist.id === params.artist_id) {
                              this.artist$.next(groupedArtist);
                              this.artistGroup$.next(group);
                              this.halArtistGroup$.next(halArtistGroup);
                            }
                          });
                        });
                      });
                  });
                }
              }
          });
        }
      });
  }

  public loadRecentSourcesLink(link: HalLink) {
    this.recentSources$ = this.sourceService.loadLink(link);
  }

  public loadRecentSourceCommentsLink(link: HalLink) {
    this.recentSourceComments$ = this.sourceCommentService.loadLink(link);
  }
}
