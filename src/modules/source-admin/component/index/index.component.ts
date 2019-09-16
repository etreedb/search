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
import { ArtistGroup } from '@modules/data/schema/artist-group';
import { UserService } from '@modules/data/service/user.service';
import { ArtistService } from '@modules/data/service/artist.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  public recentSources: HalSource;
  public recentSourceComments: HalSourceComment;
  public user: User;
  public artist$: Subject<Artist>;
  public artist: Artist;
  public artistGroup: ArtistGroup;
  public halArtistGroup: HalArtistGroup;

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
  }

  ngOnInit() {
    this.user = plainToClass(User, this.oauthService.getIdentityClaims());

    this.activatedRoute.params.subscribe(params => {
      // If the artist groups are already loaded do not try to reload
      if (this.halArtistGroup) {
        this.halArtistGroup._embedded.artist_group.forEach(group => {
          group._embedded.artist.forEach(artist => {
            if (artist.id === params.artist_id) {
              this.artist = artist;
              this.artistGroup = group;
              this.artist$.next(artist);
            }
          });
        });
      } else {
        // Load this users artist groups
        this.artistGroupService.findByUser(this.user)
          .subscribe(data => {
            if (! params.artist_id || parseInt(params.artist_id, 10) === 0) {
              this.updateArtist(data._embedded.artist_group[0]._embedded.artist[0].id);
            }

            // Find the artist and group within the user's permitted artist groups
            data._embedded.artist_group.forEach(group => {
              console.log(group);
              group._embedded.artist.forEach(artist => {
                console.log(artist);
                if (artist.id === params.artist_id) {
                  this.artist = artist;
                  this.artistGroup = group;
                  this.halArtistGroup = data;
                  this.artist$.next(artist);
                }
              });
            });

            // If the artist is not found check if user has admin permissions
            if (! this.artist && params.artist_id > 0) {
              if (this.userService.hasRole(this.user, 'admin')) {
                // User is admin and should have access to all artists
                this.artistService.find(params.artist_id).subscribe(artist => {
                  this.halArtistGroup = null;
                  this.artistGroupService.findByUrl(artist._embedded.artistGroup._links.self.href)
                    .subscribe(halArtistGroup => {

                      halArtistGroup._embedded.artist_group.forEach(group => {
                        group._embedded.artist.forEach(groupedArtist => {
                          if (groupedArtist.id === params.artist_id) {
                            this.artist = groupedArtist;
                            this.artistGroup = group;
                            this.halArtistGroup = halArtistGroup;
                            this.artist$.next(groupedArtist);
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

    this.artist$.subscribe(artist => {
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
            direction: 'desc'
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
            direction: 'desc'
          }
        ],
        page: 1,
        limit: 10
      };

      this.sourceCommentService.findBy(sourceCommentQuery)
        .subscribe(data => this.recentSourceComments = data);
    });

  }

  public updateArtist(artistId: number) {
    this.router.navigate(['/source-admin/index', artistId], {
      relativeTo: this.activatedRoute,
   });
  }

  public runAction($event) {
    console.log($event.target.value);
    switch ($event.target.value) {
      case 'edit-header-footer':
        this.artist$.subscribe(
          artist => this.router.navigate(['/source-admin/artist-group-header-footer', artist.id])
        );
        alert('post case');
        break;
      default:
        return false;
        break;
    }
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
