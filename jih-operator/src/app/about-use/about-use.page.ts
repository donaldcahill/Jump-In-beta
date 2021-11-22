/* eslint-disable @typescript-eslint/consistent-type-assertions */
/* eslint-disable prefer-const */
/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { ToastService } from '../providers/toast.service';
import { StorageApiService } from '../providers/storage-api.service';
import { StorageDto } from '../dto/StorageDto';
import { ApiService } from '../providers/api.service';
import { GlobalDto } from '../dto/GlobalDto';
import { UserValidator } from '../dto/UserValidatorDto';
import {
  Plugins,
  StatusBarStyle,
} from '@capacitor/core';

const { StatusBar } = Plugins;
@Component({
  selector: 'app-about-use',
  templateUrl: './about-use.page.html',
  styleUrls: ['./about-use.page.scss'],
})
export class AboutUsePage implements OnInit {

  slideOpts = {
    initialSlide: 1,
    speed: 400
  };
  constructor(
    public menuCtrl: MenuController,
    private _router: Router,
    public toastService: ToastService,
    public storageApiService: StorageApiService,
    public apiService: ApiService
  ) {
    StatusBar.setBackgroundColor({
      color:'#FFFFFF'
    });
  }

  ngOnInit() {
    this.menuCtrl.enable(false);
    this.obtenerUsuario();
  }
  irLogin(){
    this._router.navigateByUrl('login');
  }
  async obtenerUsuario() {
    try{
      const usuario: StorageDto = await this.storageApiService.getObject();
      console.log(usuario);
      if(usuario){
        let userValidator: UserValidator = <UserValidator>{};
        userValidator.idUser = usuario.idOperator;
        userValidator.user = usuario.email;
        let respuesta = await this.apiService.postGlobal<GlobalDto>(userValidator, '/operator/operator-validate').toPromise();
        if(respuesta.state){
          this.toastService.toastMensaje('Success', 'You are logued '+ usuario.email +'.');
          this._router.navigateByUrl('home');
        }else {
          this.storageApiService.setObject(undefined);
        }

      }
    }catch(err){
      console.log(err);
    }


  }

}
