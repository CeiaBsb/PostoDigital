import { Observable } from 'rxjs/Observable';
import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-modal-confimacao',
  templateUrl: './modal-confimacao.component.html',
  styleUrls: ['./modal-confimacao.component.css']
})
export class ModalConfimacaoComponent implements OnInit {

  static dialogRef: MatDialogRef<ModalConfimacaoComponent>;
  static mensagem: string;

  constructor(public dialog: MatDialog) {}

  ngOnInit() {
  }

  mostrarModal(mensagem: string): Observable<boolean> {
    ModalConfimacaoComponent.mensagem = mensagem;
    ModalConfimacaoComponent.dialogRef = this.dialog.open(ModalConfimacaoComponent, {
      height: '200px',  width: '300px', disableClose: true
    });
    return ModalConfimacaoComponent.dialogRef.afterClosed();
  }

  getMensagem() {
    return ModalConfimacaoComponent.mensagem;
  }

  responderSim() {
    ModalConfimacaoComponent.dialogRef.close(true);
  }

  responderNao() {
    ModalConfimacaoComponent.dialogRef.close(false);
  }
}
