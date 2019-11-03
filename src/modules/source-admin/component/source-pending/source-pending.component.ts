import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '@modules/data/schema/user';
import { plainToClass } from 'class-transformer';
import { OAuthService } from 'angular-oauth2-oidc';
import { HalSource } from '@modules/data/schema/hal-source';
import { Observable } from 'rxjs';
import { SourceService } from '@modules/data/service/source.service';
import { ArtistGroup } from '@modules/data/schema/artist-group';
import { ArtistGroupService } from '@modules/data/service/artist-group.service';

@Component({
  selector: 'app-source-pending',
  templateUrl: './source-pending.component.html',
  styleUrls: ['./source-pending.component.css']
})
export class SourcePendingComponent implements OnInit {
  public user: User;
  public halSource$: Observable<HalSource>;
  public artistGroup: ArtistGroup;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private oauthService: OAuthService,
    private sourceService: SourceService,
    private artistGroupService: ArtistGroupService
  ) {
    this.user = plainToClass(User, this.oauthService.getIdentityClaims());
    this.halSource$ = new Observable();
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
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
            field: 'isApproved',
            value: 0
          }
        ]
      };


      if (params['artist_group_id']) {
        this.artistGroupService.find(params['artist_group_id'])
          .subscribe(artistGroup => this.artistGroup = artistGroup);

        query['filter'].push(
          {
            type: 'eq',
            field: 'id',
            alias: 'artistGroup',
            value: params['artist_group_id']
          }
        );
      }

      this.halSource$ = this.sourceService.findBy(query);
    });
  }
}
