/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/consistent-type-assertions */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { LoginDto } from '../dto/LoginDto';
import { ApiService } from '../providers/api.service';
import { Operators } from '../dto/Operators';
import { ToastService } from '../providers/toast.service';
import { StorageApiService } from '../providers/storage-api.service';
import { StorageDto } from '../dto/StorageDto';
import {
  Plugins,
  StatusBarStyle,
} from '@capacitor/core';

const { StatusBar } = Plugins;
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public inicioSesion: LoginDto = <LoginDto>{};
  public myForm: FormGroup = <FormGroup>{};
  constructor(
    public menuCtrl: MenuController,
    private _router: Router,
    public fb: FormBuilder,
    public apiService: ApiService,
    public toastService: ToastService,
    public storageApiService: StorageApiService
  ) {
    StatusBar.setBackgroundColor({
      color:'#115293'
    });
  }

  ngOnInit() {
    this.iniciarValidaciones();
    this.obtenerUsuario();
  }
  async obtenerUsuario() {
    try{
      const usuario: StorageDto = await this.storageApiService.getObject();
      console.log(usuario);
      if(usuario){
        this.toastService.toastMensaje('Success', 'You are logued '+ usuario.email +'.');
        this._router.navigateByUrl('home');
      }
    }catch(err){
      console.log(err);
    }


  }
  iniciarValidaciones() {
    this.myForm = this.fb.group({
      vLogin: ['', [
        Validators.required,
      ]],
      vPass: ['', [
        Validators.required,
      ]],

    });
  }
  get f(): any { return this.myForm.controls; }
  async onPropagar(){
    const respuesta = await this.apiService.postGlobal<Operators>(this.inicioSesion,'/operator/login-operator').toPromise();
    if(respuesta.idOperator){
      const usuario: StorageDto = <StorageDto>{};
      usuario.email = respuesta.email;
      usuario.idOperator = respuesta.idOperator;
      await this.storageApiService.setObject(usuario);
      this.toastService.toastMensaje('Success', 'You are logued '+ respuesta.email +'.');
      this._router.navigateByUrl('home');
    }else{
      this.toastService.toastMensaje('Error', 'Failed to record data.');
    }
  }
  onIrRegistrar() {
    this._router.navigateByUrl('register');
  }
}
