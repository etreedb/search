import { Component, OnInit } from '@angular/core';
import { HttpStatus } from '@app/http/http-interceptor.service';

@Component({
  selector: 'app-administration-layout',
  templateUrl: './administration-layout.component.html',
  styleUrls: ['./administration-layout.component.css']
})
export class AdministrationLayoutComponent implements OnInit {
  public httpActivity: boolean;
  public isNavbarCollapsed = true;

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
