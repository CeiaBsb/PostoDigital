import { Item } from './item';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthenticationService } from '../login/authentication.service';
import { ConfigurationService } from '../configuration.service';
import { Observable } from 'rxjs/Observable';
import { catchError, tap } from 'rxjs/operators';
import { UtilService } from '../util.service';

@Injectable()
export class ItensService {

    constructor(
        private http: HttpClient,
        private auth: AuthenticationService,
        private config: ConfigurationService,
        private util: UtilService
    ) { }

    listarRelacoes(id: number): Observable<ListarRelacoesResponse> {
        return this.http.get<ListarRelacoesResponse>(this.config.apiUrl + '/itens/listarRelacoesItens/' + String(id),
            this.auth.getHttpOptions())
            .pipe(
            tap(
                response => {
                    if (response.type === 'error') {
                        console.log(response.msg);
                    }
                }
            ),
            catchError(UtilService.handleError<ListarRelacoesResponse>({
                type: 'error', msg: 'Erro de conexão com a API.',
                listasItens: []
            }))
            );
    }

    listarItensParaMarcacao(id: string, data: Date): Observable<ListarItensResponse> {
        data = this.util.normalizeDate(data);
        const request = { id_relacao: id, data: data };
        return this.http.post<ListarItensResponse>(this.config.apiUrl + '/itens/itensRelacao/', request,
            this.auth.getHttpOptions())
            .pipe(
            tap(
                response => {
                    if (response.type === 'error') {
                        console.log(response.msg);
                    }
                }
            ),
            catchError(UtilService.handleError<ListarItensResponse>({
                type: 'error', msg: 'Erro de conexão com a API.',
                itens: []
            }))
            );
    }

    registrarQuantidade(idItem: string, data: Date, quantidade: number): Observable<ConfirmationResponse> {
        data = this.util.normalizeDate(data);
        const request = { id_item: idItem, data: data, quantidade: quantidade };
        return this.http.post<ConfirmationResponse>(this.config.apiUrl + '/itens/registrarQuantidade/', request,
            this.auth.getHttpOptions())
            .pipe(
            tap(
                response => {
                    if (response.type === 'error') {
                        console.log(response.msg);
                    }
                }
            ),
            catchError(UtilService.handleError<ConfirmationResponse>({
                type: 'error', msg: 'Erro de conexão com a API.'
            }))
            );
    }


    atualizarItem(item: Item): Observable<ConfirmationResponse> {
        return this.http.post<ConfirmationResponse>(this.config.apiUrl + '/itens/atualizar/', item,
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

    adicionarItem(idLista): Observable<DetalharItemResponse> {
        return this.http.get<DetalharItemResponse>(this.config.apiUrl + '/itens/adicionar/' + idLista,
            this.auth.getHttpOptions())
            .pipe(
            tap(
                response => {
                    if (response.type === 'error') {
                        console.log(response.msg);
                    }
                }
            ),
            catchError(UtilService.handleError<DetalharItemResponse>({
                type: 'error', msg: 'Erro de conexão com a API.', item: { id: 0, nome: '' }
            }))
            );
    }

    detalharItem(id: string): Observable<DetalharItemResponse> {
        return this.http.get<DetalharItemResponse>(this.config.apiUrl + '/itens/detalhar/' + id,
            this.auth.getHttpOptions())
            .pipe(
            tap(
                response => {
                    if (response.type === 'error') {
                        console.log(response.msg);
                    }
                }
            ),
            catchError(UtilService.handleError<DetalharItemResponse>({
                type: 'error', msg: 'Erro de conexão com a API.', item: { id: 0, nome: '' }
            }))
            );
    }

    excluirItem(id: string): Observable<ConfirmationResponse> {
        return this.http.get<ConfirmationResponse>(this.config.apiUrl + '/itens/excluir/' + id,
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


    resumirItensNaData(idLista: string, data: Date): Observable<ResumirItensNaDataResponse> {
        data = this.util.normalizeDate(data);
        const request = { id_lista: idLista, data: data };
        return this.http.post<ResumirItensNaDataResponse>(this.config.apiUrl + '/itens/resumirItensNaData', request,
            this.auth.getHttpOptions())
            .pipe(
            tap(
                response => {
                    if (response.type === 'error') {
                        console.log(response.msg);
                    }
                }
            ),
            catchError(UtilService.handleError<ResumirItensNaDataResponse>({
                type: 'error', msg: 'Erro de conexão com a API.',
                total: '0', contados: '0'
            }))
            );
    }

}

class ConfirmationResponse {
    type: string;
    msg: string;
}

class ListarRelacoesResponse {
    type: string;
    msg: string;
    listasItens: Item[];
}

class ItemQuantificado {
    id: string;
    nome: string;
    quantidade: number;
}

class ListarItensResponse {
    type: string;
    msg: string;
    itens: ItemQuantificado[];
}

class DetalharItemResponse {
    type: string;
    msg: string;
    item: Item;
}

class ResumirItensNaDataResponse {
    type: string;
    msg: string;
    total: string;
    contados: string;
}
