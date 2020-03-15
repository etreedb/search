import { Component } from '@angular/core';
import { HttpStatus } from '@app/http/http-interceptor.service';

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
    private httpStatus: HttpStatus
  ) {
    this.httpStatus.getHttpStatus()
      .subscribe((status: boolean) => {
        this.httpActivity = status;
      });
  }
}
