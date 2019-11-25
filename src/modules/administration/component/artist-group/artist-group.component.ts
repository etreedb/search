import { Component, OnInit } from '@angular/core';
import { HalArtistGroup } from '@modules/data/schema/hal-artist-group';
import { ArtistGroupService } from '@modules/data/service/artist-group.service';
import { AppComponent } from '@app/app.component';
import { HalLink } from '@modules/data/schema/hal-link';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-artist-group',
  templateUrl: './artist-group.component.html',
  styleUrls: ['./artist-group.component.css']
})
export class ArtistGroupComponent implements OnInit {
  public halArtistGroup: HalArtistGroup;
  public loadLink$: Subject<HalLink>;

  constructor(
    private artistGroupService: ArtistGroupService,
    private appComponent: AppComponent
  ) {
    this.appComponent.setTitle('Artist Groups');

    this.loadLink$ = new Subject();

    this.loadLink$.subscribe(halLink => this.artistGroupService.loadLink(halLink)
      .subscribe(halArtistGroup => this.halArtistGroup = halArtistGroup)
    );
  }

  ngOnInit() {
    const query = {
      'filter': [
      ],
      'order-by': [
        {
          type: 'field',
          field: 'title',
          direction: 'asc'
        }
      ],
      'limit': 99
    };

    this.artistGroupService.findBy(query)
      .subscribe(halArtistGroup => this.halArtistGroup = halArtistGroup);
  }
}
