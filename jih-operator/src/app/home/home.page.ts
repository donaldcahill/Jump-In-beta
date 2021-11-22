/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/consistent-type-assertions */
import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { ToastService } from '../providers/toast.service';
import { ApiService } from '../providers/api.service';
import { StorageApiService } from '../providers/storage-api.service';
import { StorageDto } from '../dto/StorageDto';
import { UsersOperators } from '../dto/UsersOperators';
import { Router } from '@angular/router';
import { Operators } from '../dto/Operators';
import { UserValidator } from '../dto/UserValidatorDto';
import { GlobalDto } from '../dto/GlobalDto';
import {
  Plugins,
  StatusBarStyle,
} from '@capacitor/core';

const { StatusBar } = Plugins;
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  public storageDto: StorageDto = <StorageDto>{};
  public lstUserOperator: Array<UsersOperators> = <Array<UsersOperators>>{};
  public operator: Operators = <Operators>{};
  public colorBoton = 'primary';
  public textoBoton = 'Verify State';
  constructor(
    private menuCtrl: MenuController,
    private toastService: ToastService,
    private apiService: ApiService,
    public storageApiService: StorageApiService,
    public router: Router
  ) {
    StatusBar.setBackgroundColor({
      color:'#115293'
    });
  }
  public async actualizar(){
    await this.obtenerUsuario();
  }
  async salirSesion(){
    await this.storageApiService.clear();
    this.router.navigateByUrl('login');
  }
  async obtenerUsuario() {
    try{
      this.storageDto = await this.storageApiService.getObject();
      if(this.storageDto.idOperator){
        console.log(this.storageDto.idOperator);
        this.operator = await this.apiService.getGlobal<Operators>('/operator/operator-by-id/'+ this.storageDto.idOperator).toPromise();
        if(this.operator.state === 3) {
          this.operator = await this.apiService.getGlobal<Operators>('/operator/enable-operator/'+ this.storageDto.idOperator).toPromise();
        }

        this.lstUserOperator = await this.apiService.getGlobal<Array<UsersOperators>>('/operator/user-operator-by-operator/' + this.storageDto.idOperator).toPromise();
        console.log(this.lstUserOperator);
      }else{
        this.router.navigateByUrl('login');
      }
    }
    catch(err){
      console.log(err);
      this.router.navigateByUrl('login');
    }
  }
  async validarEstadoOperator(){
    this.operator = await this.apiService.getGlobal<Operators>('/operator/operator-by-id/'+ this.storageDto.idOperator).toPromise();
    console.log(this.operator);
    if(this.operator.state === 3) {
      this.operator = await this.apiService.getGlobal<Operators>('/operator/enable-operator/'+ this.storageDto.idOperator).toPromise();
      console.log(this.operator);
      if(this.operator.state ===1){
        this.textoBoton = 'Operator Change to activate';
        this.colorBoton = 'success';
      }
    }else if(this.operator.state === 1) {
      this.textoBoton = 'Operator is Activate';
      this.colorBoton = 'success';
    }
  }

  async ngOnInit() {
    this.menuCtrl.enable(false);
    //await this.obtenerUsuario2();
    await this.obtenerUsuario();
  }
  async obtenerUsuario2() {
    try{
      const usuario: StorageDto = await this.storageApiService.getObject();
      console.log(usuario);
      if(usuario){
        let userValidator: UserValidator = <UserValidator>{};
        userValidator.idUser = usuario.idOperator;
        userValidator.user = usuario.email;
        let respuesta = await this.apiService.postGlobal<GlobalDto>(userValidator, '/operator/operator-validate').toPromise();
        if(!respuesta.state){
          this.storageApiService.setObject(undefined);
          this.router.navigateByUrl('about-use');
        }
      }
    }catch(err){
      console.log(err);
    }


  }

}
