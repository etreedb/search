import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ltgt'
})
export class LtGtPipe implements PipeTransform {

  transform(value: string, args?: any): any {
    return value.replace(/&lt;/g, '<').replace(/&gt;/g, '>');
  }

}
