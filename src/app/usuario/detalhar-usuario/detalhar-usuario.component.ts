import { UsuarioService } from './../usuario.service';
import { Component, OnInit } from '@angular/core';
import { Usuario} from '../usuario';
import { ActivatedRoute } from '@angular/router';
import { ModalErroComponent } from '../../janela-mestre/modal-erro/modal-erro.component';
import {Router} from '@angular/router';
import {ConfigurationService} from '../../configuration.service';
import { ModalProcessandoComponent } from '../../janela-mestre/modal-processando/modal-processando.component';

@Component({ 
  selector: 'app-detalhar-usuario',
  templateUrl: './detalhar-usuario.component.html',
  styleUrls: ['./detalhar-usuario.component.css']
})
export class DetalharUsuarioComponent implements OnInit {

  usuario: Usuario = { id: 0, nome: '', status: '', login: '', perfil: '', senha: ''};
  carregado = false;
  confirmarSenha: string;
  campanhasRelacionadas: any;

  constructor
  (
    private usuarioService: UsuarioService, 
    private route: ActivatedRoute, 
    private modalErro: ModalErroComponent,
    private router: Router,
    private config: ConfigurationService, 
    private modalProcessando: ModalProcessandoComponent
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.detalharUsuario(id);
    this.listarCampanhas(id);
  } 

  detalharUsuario(id: string) {
    this.carregado = false;
    this.usuarioService.detalharUsuario(id)
      .subscribe(        
        retorno => {
          this.usuario = retorno.usuario;
          this.carregado = true;
        }
      );
  }

  listarCampanhas(id: string) {
    this.usuarioService.listarCampanhas(id)
      .subscribe(        
        retorno => {
          this.campanhasRelacionadas = retorno.campanhas;
        }
      );
  }

  atualizarCampanhas(id: number) {
    this.usuarioService.atualizarCampanhas(String(id), this.campanhasRelacionadas)
      .subscribe(        
        retorno => {
        }
      );
  }

  excluirUsuario() {
    this.modalProcessando.mostrarModal();
    this.usuarioService.excluirUsuario(String(this.usuario.id))
      .subscribe(        
        retorno => {
          this.modalProcessando.fecharModal();
          if (retorno.type === 'error') {
            this.modalErro.mostrarModal(retorno.msg);
          } else {
            this.router.navigate(['listaUsuarios']);
          }
        }
      );
  }

  atualizarUsuario() {
    this.modalProcessando.mostrarModal();
    this.atualizarCampanhas(this.usuario.id);
    this.usuarioService.atualizarUsuario(this.usuario, this.confirmarSenha)
      .subscribe(        
        retorno => {
          this.modalProcessando.fecharModal();
          if (retorno.type === 'error') {
            this.modalErro.mostrarModal(retorno.msg);
          } else {
            this.router.navigate(['listaUsuarios']);
          }
        }
      );
  }

  cancelar() {
    this.router.navigate(['listaUsuarios']);
  }

}
