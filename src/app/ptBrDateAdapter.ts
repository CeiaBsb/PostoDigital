import { DateAdapter, NativeDateAdapter, MAT_DATE_LOCALE, MAT_DATE_FORMATS } from '@angular/material';

export class PtBrDateAdapter extends NativeDateAdapter {

  format(date: Date, displayFormat: Object): string {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    let strMonth: string;
    let strDay: string;
    if (month < 10) {
        strMonth = '0' + month;
    } else {
        strMonth = '' + month;
    }   
    if (day < 10) {
        strDay = '0' + day;
    } else {
        strDay = '' + day;
    }   

    return `${strDay}/${strMonth}/${year}`;
  }

  parse(value: any): Date | null {
    if ((typeof value === 'string') && (value.indexOf('/') > -1)) {
      const str = value.split('/');

      const year = Number(str[2]);
      const month = Number(str[1]) - 1;
      const date = Number(str[0]);

      if ((date < 1) || (date > 31)) {
        return new Date('a');
      }
      if ((month < 0) || (month > 11)) {
        return new Date('a');
      }
      if ((year < 1900) || (year > 2200)) {
        return new Date('a');
      }
      const data = new Date(year, month, date);
      return data;
    }
    return new Date('a');
  }

}
