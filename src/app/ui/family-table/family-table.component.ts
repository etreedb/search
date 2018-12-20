import { Component } from '@angular/core';
import { FamilyService } from '../../app.service/family.service';
import { AbstractHalLinkTable } from '../abstract-hal-link-table';

@Component({
  selector: 'app-family-table',
  templateUrl: './family-table.component.html',
  styleUrls: ['./family-table.component.css']
})
export class FamilyTableComponent extends AbstractHalLinkTable {
  constructor(
    protected halService: FamilyService
  ) {
    super();
  }

  rot13Decrypt (s) {
    return s.replace(
       /[a-zA-Z]/g,
       function(c) {
           return String.fromCharCode((c <= 'Z' ? 90 : 122) >= (c = c.charCodeAt(0) + 13) ? c : c - 26);
       }
   );
  }
}
