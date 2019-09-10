import { Directive, ElementRef, OnInit } from '@angular/core';
import * as $ from 'jquery';

@Directive({
  selector: '[appFileUploadText]'
})
export class FileUploadTextDirective implements OnInit {
  private element: any;
  private field: JQuery<HTMLElement>;

  constructor(el: ElementRef) {
    this.element = el.nativeElement;
  }

  ngOnInit() {
    const fileUploadTextDirective = this;

    // Assign id to resolve jquery field.  Will be overwritten by template
    if (! this.element.id) {
      this.element.id = 'tempId';
    }
    this.field = $('#' + this.element.id);

    // Build and position container
    const fileInput = $('<input type="file">');
    fileInput.on('change', ($event) => {
      fileUploadTextDirective.openFile($event);
    });
    $(fileInput).insertAfter(fileUploadTextDirective.element);
  }

  openFile($event) {
    const input = $event.target;
    for (let index = 0; index < input.files.length; index++) {
        const reader = new FileReader();
        reader.onload = () => {
            this.element.value = reader.result;
            this.element.dispatchEvent(new Event('input'));
            this.element.dispatchEvent(new Event('change'));
        };

        reader.readAsText(input.files[index]);
    }
  }
}
