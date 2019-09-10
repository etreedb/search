import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-etree-collection-layout',
  templateUrl: './etree-collection-layout.component.html',
  styleUrls: ['./etree-collection-layout.component.css']
})
export class EtreeCollectionLayoutComponent implements OnInit {
  public isNavbarCollapsed = true;
  public httpActivity: boolean;

  constructor() { }

  ngOnInit() {
  }

}
