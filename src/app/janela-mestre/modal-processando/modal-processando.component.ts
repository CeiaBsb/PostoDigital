import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-modal-processando',
  templateUrl: './modal-processando.component.html',
  styleUrls: ['./modal-processando.component.css']
})
export class ModalProcessandoComponent implements OnInit {

  dialogRef: MatDialogRef<ModalProcessandoComponent>;
  constructor(public dialog: MatDialog) {}

  ngOnInit() {
  }

  mostrarModal(): void {
    this.dialogRef = this.dialog.open(ModalProcessandoComponent, {
      height: '100px',  width: '300px', disableClose: true
      // height: '300px',  width: '200px',
    });
  }

  fecharModal(): void {
    this.dialogRef.close();
  }

}
