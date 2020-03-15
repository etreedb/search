import { Component, OnInit } from '@angular/core';
import { HttpStatus } from '@app/http/http-interceptor.service';

@Component({
  selector: 'app-etree-collection-layout',
  templateUrl: './etree-collection-layout.component.html',
  styleUrls: ['./etree-collection-layout.component.css']
})
export class EtreeCollectionLayoutComponent implements OnInit {
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
