import { Component, OnInit, Input } from '@angular/core';
import { HalEntityLink } from '../../schema/hal-entity-link';
import { HalLink } from '../../schema/hal-link';
import { EntityLinkService } from '../../service/entity-link.service';

@Component({
  selector: 'app-link-table',
  templateUrl: './link-table.component.html',
  styleUrls: ['./link-table.component.css']
})
export class LinkTableComponent implements OnInit {
  public halEntityLink: HalEntityLink;

  @Input()
  set halLink(halLink: HalLink) {
    this.entityLinkService.loadLink(halLink)
      .subscribe(halEntityLink => this.halEntityLink = halEntityLink);
  }

  // One of artist, performance, source
  @Input() entityType: string;

  constructor(
    private entityLinkService: EntityLinkService
  ) { }

  ngOnInit() {
  }

  getLinks(): void {
    return this.halEntityLink._embedded[this.entityType + '_link'];
  }
}
