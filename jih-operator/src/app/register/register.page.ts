/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/consistent-type-assertions */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { ApiService } from '../providers/api.service';
import { Countries } from '../dto/Countries';
import { Languages } from '../dto/Languages';
import { Operators } from '../dto/Operators';
import { ReqOperatorsDto } from '../dto/ReqOperatorsDto';
import { SupportLanguages } from '../dto/SupportLanguages';
import { GlobalDto } from '../dto/GlobalDto';
import { ToastService } from '../providers/toast.service';
import { StorageDto } from '../dto/StorageDto';
import { ResOperadorDto } from '../dto/ResOperatorDto';
import { StorageApiService } from '../providers/storage-api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  public myForm: FormGroup = <FormGroup>{};
  public lstCountries: Countries[] = [];
  public lstLanguages: Languages[] = [];
  public operador: Operators = <Operators>{};
  public languagesSelected: string[] = [];
  public reqOperador: ReqOperatorsDto = <ReqOperatorsDto>{};
  constructor(
    public menuCtrl: MenuController,
    private _router: Router,
    public fb: FormBuilder,
    public apiService: ApiService,
    public toastService: ToastService,
    public storageApiService: StorageApiService
  ) { }

  ngOnInit() {
    this.menuCtrl.enable(false);
    this.listarCountries();
    this.listarLanguages();
    this.iniciarValidaciones();
  }

  iniciarValidaciones() {
    this.myForm = this.fb.group({
      vName: ['', [
        Validators.required,
      ]],
      vEmail: ['', [
        Validators.required,
        Validators.email
      ]],
      vPass: ['', [
        Validators.required,
      ]],
      vPhone: ['', [
        Validators.required,
      ]],
      vCountry: ['', [
        Validators.required,
      ]],
      vLanguages: ['', [
        Validators.required,
      ]],
    });
  }
  get f(): any { return this.myForm.controls; }

  async listarCountries(){
    this.lstCountries = await this.apiService.getGlobal<Countries[]>('/operator/list-countries').toPromise();
  }
  async listarLanguages() {
    this.lstLanguages = await this.apiService.getGlobal<Languages[]>('/operator/list-languages').toPromise();
  }
  async grabar() {
    try{
      console.log(this.languagesSelected);
      const listasupport: SupportLanguages[] = [];
      for (const iterator of this.languagesSelected) {
        const seleccionado: SupportLanguages = <SupportLanguages>{};
        seleccionado.idLanguage = iterator;
        listasupport.push(seleccionado);
      }
      this.reqOperador.languages = listasupport;
      console.log('Usuario');
      console.log(this.operador.idCountry);
  
      const lista: Countries[]  = this.lstCountries.filter(x=> x.idCountry === this.operador.idCountry);
      console.log('*********************');
      console.log(lista);

      this.operador.phoneNumber = lista[0].callingCode + this.operador.phoneNumber;
      this.reqOperador.operator= this.operador;

      
      const respuesta = await this.apiService.postGlobal<ResOperadorDto>(this.reqOperador,'/operator/register-operator').toPromise();
      if(respuesta.state){
        const usuario: StorageDto = <StorageDto>{};
        usuario.email = respuesta.operator.email;
        usuario.idOperator = respuesta.operator.idOperator;
        await this.storageApiService.setObject(usuario);
        this._router.navigateByUrl('home');
      }else{
        this.toastService.toastMensaje('Error','Failed to record data.');
      }
      
    }catch(ex){
      this.toastService.toastMensaje('Error','Failed to record data.');
    }
  }

}
