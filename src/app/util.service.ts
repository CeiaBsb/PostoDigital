import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

@Injectable()
export class UtilService {

    public static handleError<T>(result?: T) {
        return (error: any): Observable<T> => {
          // mostra o erro no console do browser
          console.error(error);
    
          // retorna o resultado alternativo
          return of(result as T);
        };
      }

    constructor() { }

    normalize(str: string): string {
        const accentMap = {
            'á': 'a', 'ã': 'a', 'à': 'a', 'â': 'a', 'é': 'e', 'ê': 'e', 'í': 'i', 'ó': 'o', 'õ': 'o', 'ô': 'o', 'ú': 'u', 'ç': 'c'
        };
        if (!str) { return ''; }
        str = str.toLowerCase();
        let ret = '';
        for (let i = 0; i < str.length; i++) {
            ret += accentMap[str.charAt(i)] || str.charAt(i);
        }
        return ret;
    }

    normalizeDate(data: Date): Date {
        let  novaData: Date = new Date(data);
        novaData.setSeconds(0);
        novaData.setMinutes(0);
        novaData.setHours(0);
        novaData.setMilliseconds(0);
        novaData = new Date(novaData.valueOf() - novaData.getTimezoneOffset() * 60000);
        return novaData;
    }

}
