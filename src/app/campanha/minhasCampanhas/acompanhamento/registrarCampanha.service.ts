import { Campanha } from './../../campanha';
import { Injectable } from '@angular/core';
import { Pessoa } from '../../../pessoa/pessoa';

@Injectable()
export class RegistrarCampanhaService {

    campanha: Campanha;
    data: Date;
    filtro = '';
    
    folhaFreqSelecionada: string;
    relacaoItensSelecionada: string;

    constructor() { }

    init() {
        this.campanha = null;
        this.data = null;
        this.folhaFreqSelecionada = null;
    }

}

class Folha {
    id: string;
    nome: string;
}

class PessoaPresenca {
    id: number;
    nome: string;
    dt_nascimento: Date;
    atualizado: string;
    tem_foto: string;
    presente: boolean;
}
