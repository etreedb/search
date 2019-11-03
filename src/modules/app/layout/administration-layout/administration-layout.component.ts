import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-administration-layout',
  templateUrl: './administration-layout.component.html',
  styleUrls: ['./administration-layout.component.css']
})
export class AdministrationLayoutComponent implements OnInit {
  public httpActivity: boolean;
  public isNavbarCollapsed = true;

  constructor() { }

  ngOnInit() {
  }

}
