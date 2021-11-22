import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { WriterRegisterComponent } from './writer-register/writer-register.component';
import { ChangePassComponent } from './change-pass/change-pass.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { ComunModule } from './comun/comun.module';
import { MaterialImportModule } from './material-import';
import { NgxSpinnerModule } from 'ngx-spinner';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    WriterRegisterComponent,
    ChangePassComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    DashboardModule,
    ComunModule,
    MaterialImportModule,
    NgxSpinnerModule,
    HttpClientModule,
  ],
  exports: [
    MaterialImportModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
