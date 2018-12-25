import { Component, OnInit, Input } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-textarea-tools',
  templateUrl: './textarea-tools.component.html',
  styleUrls: ['./textarea-tools.component.css']
})
export class TextareaToolsComponent implements OnInit {
  public field: any;

  @Input()
  id: string;

  public properCase() {
    alert(this.id);
    console.log($('#' + this.id));
    this.field.val(this.field.val().ucFirst());
  }

  constructor() { }

  ngOnInit() {
    $('this');
  }

  noTimings() {

  }

  noTrackNumbers() {

  }


  unescapeQuotes() {

  }

  nobr() {

  }

  tokenizeSlashes() {

  }

  characterMap() {

  }

}
