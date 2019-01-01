import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'rot13Decode'
})
export class Rot13DecodePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return value.replace(/[a-zA-Z]/g, char =>
      String.fromCharCode((char <= 'Z' ? 90 : 122) >= (char = char.charCodeAt(0) + 13) ? char : char - 26));
  }

}
