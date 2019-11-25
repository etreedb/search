import { Component, OnInit } from '@angular/core';
import { HalArtistGroup } from '@modules/data/schema/hal-artist-group';
import { ArtistGroupService } from '@modules/data/service/artist-group.service';
import { AppComponent } from '@app/app.component';
import { HalLink } from '@modules/data/schema/hal-link';

@Component({
  selector: 'app-artist-group',
  templateUrl: './artist-group.component.html',
  styleUrls: ['./artist-group.component.css']
})
export class ArtistGroupComponent implements OnInit {
  public halArtistGroup: HalArtistGroup;

  constructor(
    private artistGroupService: ArtistGroupService,
    private appComponent: AppComponent
  ) {
    this.appComponent.setTitle('Artist Groups');
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

  loadLink(halLink: HalLink): void {
    this.artistGroupService.loadLink(halLink)
      .subscribe(halArtistGroup => this.halArtistGroup = halArtistGroup);
  }
}
