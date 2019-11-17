import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-torrent-layout',
  templateUrl: './torrent-layout.component.html',
  styleUrls: ['./torrent-layout.component.css']
})
export class TorrentLayoutComponent implements OnInit {

  public isNavbarCollapsed = true;
  public httpActivity: boolean;

  constructor() { }

  ngOnInit() {
  }
}
