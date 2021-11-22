import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrintErrorComponent } from './print-error/print-error.component';
import { NavbarComponent } from './navbar/navbar.component';
import { MaterialImportModule } from '../material-import';



@NgModule({
  declarations: [
    PrintErrorComponent,
    NavbarComponent
  ],
  imports: [
    CommonModule,
    MaterialImportModule,
  ],
  exports: [
    PrintErrorComponent,
    NavbarComponent
  ]
})
export class ComunModule { }
