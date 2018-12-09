import {enableProdMode} from '@angular/core';
import { Component } from '@angular/core';

enableProdMode();

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'Search etreedb.org';
}

export const apiUrl = 'https://api.etreedb.org';
