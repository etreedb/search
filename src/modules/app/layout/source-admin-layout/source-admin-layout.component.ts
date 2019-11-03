import { Component, OnInit, AfterContentChecked } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-source-admin-layout',
  templateUrl: './source-admin-layout.component.html',
  styleUrls: ['./source-admin-layout.component.css']
})
export class SourceAdminLayoutComponent {
  public artistId = 0;
  public httpActivity: boolean;
  public isNavbarCollapsed = true;

  constructor(
    private activatedRoute: ActivatedRoute
  ) {
  }
}
