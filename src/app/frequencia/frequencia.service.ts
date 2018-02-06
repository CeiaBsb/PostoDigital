import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthenticationService } from '../login/authentication.service';
import { ConfigurationService } from '../configuration.service';
import { Observable } from 'rxjs/Observable';
import { catchError, tap } from 'rxjs/operators';
import { UtilService } from '../util.service';

@Injectable()
export class FrequenciaService {

    constructor(
        private http: HttpClient,
        private auth: AuthenticationService,
        private config: ConfigurationService,
        private util: UtilService
    ) { }

    marcarPresenca(idPessoa: string, idFolha: string, data: Date, presenca: boolean): Observable<ConfirmationResponse> {
        data = this.util.normalizeDate(data);
        const request: MarcarPresencaRequest = { id_pessoa: idPessoa, id_folha: idFolha, data: data, presente: String(presenca) };
        return this.http.post<ConfirmationResponse>(this.config.apiUrl + '/frequencia/registrarPresenca', request,
            this.auth.getHttpOptions())
            .pipe(
            tap(
                response => {
                    if (response.type === 'error') {
                        console.log(response.msg);
                    }
                }
            ),
            catchError(UtilService.handleError<ConfirmationResponse>({ type: 'error', msg: 'Erro de conexão com a API.' }))
            );
    }


    listarFolhas(id: number): Observable<ListarFolhasResponse> {
        return this.http.get<ListarFolhasResponse>(this.config.apiUrl + '/frequencia/listarFolhas/' + String(id),
            this.auth.getHttpOptions())
            .pipe(
            tap(
                response => {
                    if (response.type === 'error') {
                        console.log(response.msg);
                    }
                }
            ),
            catchError(UtilService.handleError<ListarFolhasResponse>({
                type: 'error', msg: 'Erro de conexão com a API.',
                listasFrequencia: []
            }))
            );
    }

    listarPessoasParaFrequencia(id: string, data: Date): Observable<ListarPessoasResponse> {
        data = this.util.normalizeDate(data);
        const request: ListarPessoasRequest = { id_folha: id, data: data };
        return this.http.post<ListarPessoasResponse>(this.config.apiUrl + '/frequencia/pessoasFrequencia/', request,
            this.auth.getHttpOptions())
            .pipe(
            tap(
                response => {
                    if (response.type === 'error') {
                        console.log(response.msg);
                    }

                    for (const pessoa of response.pessoas) {
                        if (pessoa.presente as any === 'false') {
                            pessoa.presente = false;
                        } else if (pessoa.presente as any === 'true') {
                            pessoa.presente = true;
                        }
                    }
                }
            ),
            catchError(UtilService.handleError<ListarPessoasResponse>({
                type: 'error', msg: 'Erro de conexão com a API.',
                pessoas: []
            }))
            );
    }

    resumirFolhaNaData(idFolha: string, data: Date): Observable<ResumirFolhaNaDataResponse> {
        data = this.util.normalizeDate(data);
        const request = { id_folha: idFolha, data: data };
        return this.http.post<ResumirFolhaNaDataResponse>(this.config.apiUrl + '/frequencia/resumirFolhaNaData', request,
            this.auth.getHttpOptions())
            .pipe(
            tap(
                response => {
                    if (response.type === 'error') {
                        console.log(response.msg);
                    }
                }
            ),
            catchError(UtilService.handleError<ResumirFolhaNaDataResponse>({ type: 'error', msg: 'Erro de conexão com a API.',
            pessoas: '0', presentes: '0' }))
            );
    }

}

class ResumirFolhaNaDataResponse {
    type: string;
    msg: string;
    pessoas: string;
    presentes: string;
}

class MarcarPresencaRequest {
    id_pessoa: string;
    id_folha: string;
    data: Date;
    presente: string;
}

class ConfirmationResponse {
    type: string;
    msg: string;
}

class Folha {
    id: string;
    nome: string;
}

class ListarFolhasResponse {
    type: string;
    msg: string;
    listasFrequencia: Folha[];
}

class PessoaPresenca {
    id: number;
    nome: string;
    dt_nascimento: Date;
    atualizado: string;
    tem_foto: string;
    presente: boolean;
}

class ListarPessoasRequest {
    id_folha: string;
    data: Date;
}

class ListarPessoasResponse {
    type: string;
    msg: string;
    pessoas: PessoaPresenca[];
}
