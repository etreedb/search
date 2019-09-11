import { Component, OnInit } from '@angular/core';
import { ArtistGroupService } from '@modules/data/service/artist-group.service';
import { SourceAdminLayoutComponent } from '@app/layout/source-admin-layout/source-admin-layout.component';
import { HalArtistGroup } from '@modules/data/schema/hal-artist-group';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  constructor(
    private sourceAdminLayout: SourceAdminLayoutComponent
  ) { }

  ngOnInit() {
  }
}
