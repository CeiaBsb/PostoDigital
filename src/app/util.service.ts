import { Injectable } from '@angular/core';

@Injectable()
export class UtilService {

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

}
