import { Component, OnInit, Input } from '@angular/core';
import { HalLinks } from '@modules/data/schema/hal-links';
import { Subject } from 'rxjs';
import { HalLink } from '@modules/data/schema/hal-link';

@Component({
  selector: 'app-pagination-links',
  templateUrl: './pagination-links.component.html',
  styleUrls: ['./pagination-links.component.css']
})
export class PaginationLinksComponent {

  @Input()
  public halLinks: HalLinks;

  @Input()
  public loadLink$: Subject<HalLink>;

  @Input()
  public btnClass: '';
}
