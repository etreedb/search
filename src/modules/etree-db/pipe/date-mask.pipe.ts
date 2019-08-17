import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateMask'
})
export class DateMaskPipe implements PipeTransform {

  // Mask the passed field to yyyy-mm-dd
  transform(value: any, args?: any): any {

    if (! value) {
      return value;
    }

    const debug = false;

    // Verify only valid characters
    const m1 = /([^0-9^\-^\?])$/;

    // Add slash after year
    const m2 = /^([0-9\?]{4})$/;

    // Add slash after month
    const m3 = /^([0-9\?\-]{7})$/;

    // Only allow century 19 and 20
    const m4 = /^([2][^0]|[1][^9]|[\?]{1-2})$/;

    // Only allow months 01-12|??
    const m5b = /^([0-9\?\-]{5}[2-9])$/;
    const m5 = /^([0-9\?\-]{5}[2-9])$/;
    const m5a = /^([0-9\?\-]{5}[1][3-9])$/;

    // Only allow day 01-31
    const m6b = /^([0-9\?\-]{7}\-[4-9])$/;
    const m6 = /^([0-9\?\-]{7}\-[4-9][0-9])$/;
    const m6a = /^([0-9\?\-]{7}\-[3-9][2-9])$/;

    if (m1.test(value)) {
      if (debug) {
        alert('m1');
      }
      value = value.substring(0, value.length - 1);
    } else if (m5b.test(value)) {
      if (debug) {
        alert('m5b');
      }
      const suffix = value.substring(value.length - 1);
      const prefix = value.substring(0, 5);
      value = prefix + '0' + suffix + '-';
    } else if (m5.test(value)) {
      if (debug) {
        alert('m5');
      }
      value = value.substring(0, value.length - 1);
    } else if (m5a.test(value)) {
      if (debug) {
        alert('m5a');
      }
      value = value.substring(0, value.length - 1);
    } else if (m6b.test(value)) {
      if (debug) {
        alert('m6b');
      }
      const suffix = value.substring(value.length - 1);
      const prefix = value.substring(0, 8);
      value = prefix + '0' + suffix;
    } else if (m6.test(value)) {
      if (debug) {
        alert('m6');
      }
      value = value.substring(0, value.length - 1);
    } else if (m6a.test(value)) {
      if (debug) {
        alert('m6a');
      }
      value = value.substring(0, value.length - 1);
    } else if (m2.test(value)) {
      if (debug) {
        alert('m2');
      }
      value += '-';
    } else if (m3.test(value)) {
      if (debug) {
        alert('m3');
      }
      value += '-';
    } else if (m4.test(value)) {
      if (debug) {
        alert('m4');
      }
      value = value.substring(0, value.length - 1);
    }


    if (value.substring(value.length - 2) === '\/\/') {
        value = value.substring(0, value.length - 1);
    }

    return value;
  }
}
