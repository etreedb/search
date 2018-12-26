import { Directive, ElementRef, OnInit, HostListener } from '@angular/core';
import * as $ from 'jquery';

@Directive({
  selector: '[appTextareaTools]'
})
export class TextareaToolsDirective implements OnInit {
  private element: any;
  private buttons: Array<any> = [];

  constructor(el: ElementRef) {
    this.element = el.nativeElement;
  }

  ngOnInit() {
    const field: JQuery<HTMLElement> = $('#' + this.element.id);
    const directive = this;

    this.buttons[this.buttons.length] = {
      title: 'No Timings',
      field: field,
      direct: function() {
        field.val(String(field.val()).replace(/[\[\( ]*\d{1,2}[\.:]\d{1,2}?(.\d\d)[\]\) ]*/g, '')
          .replace(/[\[\( ]*\d{1,2}[\.:]\d{1,2}[\]\) ]*/g, ''));
        directive.testButtons();
      },
      test: function() {
        return field.val() === String(field.val()).replace(/[\[\( ]*\d{1,2}[\.:]\d{1,2}?(.\d\d)[\]\) ]*/g, '')
          .replace(/[\[\( ]*\d{1,2}[\.:]\d{1,2}[\]\) ]*/g, '');
      }
    };

    this.buttons[this.buttons.length] = {
      title: 'No Track #\'s',
      field: field,
      direct: function() {
        field.val(String(field.val())
          .replace(/^[0-9]{1,3}[:\)-\.\t ][-:]?[ \t]*/mg, '')
          .replace(/^[dsDS][0-9][tT][0-9]{1,2}[:\)-\.\t ][-:]?[ \t]*/mg, ''));
        directive.testButtons();
      },
      test: function() {
          return (this.field.val() === this.field.val()
            .replace(/^[0-9]{1,3}[:\)-\.\t ][-:]?[ \t]*/mg, '')
            .replace(/^[dsDS][0-9][Tt][0-9]{1,2}[:\)-\.\t ][-:]?[ \t]*/mg, ''));
      }
    };

    this.buttons[this.buttons.length] = {
      title: 'Proper Case',
      field: field,
      direct: function() {
        field.val(directive.ucFirst(field.val()));
        directive.testButtons();
      },
      test: function() {
          return String(field.val()).trim() === directive.ucFirst(field.val()).trim();
      }
    };

    this.buttons[this.buttons.length] = {
      title: 'Unescape Quotes',
      tooltop: 'Remove \' and \"',
      field: field,
      direct: function() {
        field.val(String(field.val())
          .replace(/(\\')/g, '\'')
          .replace(/(\\')/g, '\''));
        directive.testButtons();
      },
      test: function() {
        return this.field.val() === this.field.val()
          .replace(/(\\')/g, '')
          .replace(/(\\')/g, '\'');
      }
    };

    this.buttons[this.buttons.length] = {
      title: 'Tokenize Slashes',
      field: field,
      direct: function() {
        field.val(String(field.val()).replace(/[\/\\]/g, '\n'));
        directive.testButtons();
      },
      test: function() {
        return this.field.val() === this.field.val().replace(/[\/\\]/g, '\n');
      }
    };

    this.buttons[this.buttons.length] = {
      title: 'Character Map',
      field: field,
      limited: true,
      direct: function() {
        const handle = window.open(
          '/charmap.html',
          'charmap',
          'toolbar=0,scrollbars=0,location=0,statusbar=0,menubar=0,width=420,height=490,resizable=1');
        handle.focus();
      },
      test: function() {
        return true;
      }
    };

    // Build <li> for each tool
    const ul = $('<ul class="etreedb-textareatools-container" />');
    for (let button = 0; button < this.buttons.length; button++) {
      const li = $('<li class="etreedb-textareatools badge badge-light">'
        + this.buttons[button].title.replace(/ /g, '&nbsp;')
        + '</li>');
      li.attr('title', this.buttons[button].tooltip);
      $(li).data('helper', this.buttons[button]);
      li.click($(li).data('helper').direct);
      ul.append(li);
    }

    // Build and position container
    const dock = $('<div class="textareatools"></div>');
    $(dock).append(ul);
    $(dock).insertBefore(field);
    $(field).data('helper', ul);
  }

  @HostListener('keyup', ['$event']) keyUp() {
    this.testButtons();
  }

  testButtons() {
    const field: JQuery<HTMLElement> = $('#' + this.element.id);

    field.data('helper').find('li').each(function(index, node) {
      if ($(node).data('helper').test()) {
        $(node).removeClass('badge-warning');
        $(node).addClass('badge-light');
      } else {
        $(node).addClass('badge-warning');
        $(node).removeClass('badge-light');
      }
    });
  }

  ucFirst(str) {
    str = str.toLowerCase().split(' ');
    for (let i = 0; i < str.length; i++) {
      str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
    }

    return str.join(' ');
  }
}
