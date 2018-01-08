import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MediaMatcher} from '@angular/cdk/layout';

import {
  MatButtonModule, 
  MatFormFieldModule, 
  MatInputModule,
  MatToolbarModule,
  MatIconModule, 
  MatSidenavModule,
  MatListModule,
  MatDialogModule,
  MatProgressSpinnerModule,
  MatSelectModule,
  MatCheckboxModule,
  MatExpansionModule
} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule, 
    MatFormFieldModule,
    MatInputModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule, 
    MatSidenavModule,
    MatListModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatCheckboxModule,
    MatExpansionModule
  ],
  exports: [
    MatButtonModule, 
    MatFormFieldModule,
    MatInputModule,
    BrowserAnimationsModule,
    MatToolbarModule  ,
    MatIconModule, 
    MatSidenavModule,
    MatListModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatCheckboxModule,
    MatExpansionModule
  ],
  providers: [
    MediaMatcher
  ],
  declarations: []
})
export class MaterialModule { }
