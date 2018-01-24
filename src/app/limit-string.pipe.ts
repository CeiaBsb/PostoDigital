import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'limitString'
})
export class LimitStringPipe implements PipeTransform {

  transform(value: string, maxSize: number): any {
    if (value.length <= maxSize) {
      return value;
    } else {
      const novaString = value.substr(0, maxSize);
      return novaString.concat('...');
    }
  }

}
