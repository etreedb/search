import { Component, OnInit } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { plainToClass } from 'class-transformer';
import { User } from '@modules/data/schema/user';
import { ArtistGroupService } from '@modules/data/service/artist-group.service';
import { HalArtistGroup } from '@modules/data/schema/hal-artist-group';
import { ArtistGroup } from '@modules/data/schema/artist-group';
import { Artist } from '@modules/data/schema/artist';
import { Observable, BehaviorSubject, Subject } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-source-admin-layout',
  templateUrl: './source-admin-layout.component.html',
  styleUrls: ['./source-admin-layout.component.css']
})
export class SourceAdminLayoutComponent implements OnInit {
  public isNavbarCollapsed = true;
  public httpActivity: boolean;
  public user: User;
  public halArtistGroup: HalArtistGroup;
  public artist: Subject<Artist>;

  constructor(
    private oauthService: OAuthService,
    private artistGroupService: ArtistGroupService,
    private activatedRoute: ActivatedRoute,
    private router: Router
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
  }

  public updateArtist($event) {
    this.router.navigate(['.'], {
      relativeTo: this.activatedRoute,
      queryParams: {
        artist_id: $event.target.value
      }
    });
  }
}
