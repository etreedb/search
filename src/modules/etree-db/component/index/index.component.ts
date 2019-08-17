import { Component } from '@angular/core';
import { AppComponent } from '@app/app.component';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent {
  constructor(
    private appComponent: AppComponent
   ) {
    this.appComponent.setTitle('search.etreedb.org');
   }
}
