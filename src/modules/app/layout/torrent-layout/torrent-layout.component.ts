import { Component, OnInit } from '@angular/core';
import { HttpStatus } from '@app/http/http-interceptor.service';

@Component({
  selector: 'app-torrent-layout',
  templateUrl: './torrent-layout.component.html',
  styleUrls: ['./torrent-layout.component.css']
})
export class TorrentLayoutComponent implements OnInit {

  public isNavbarCollapsed = true;
  public httpActivity: boolean;

  constructor(
    private httpStatus: HttpStatus
  ) {
    this.httpStatus.getHttpStatus()
    .subscribe((status: boolean) => {
      this.httpActivity = status;
    });
  }

  ngOnInit() {
  }
}
