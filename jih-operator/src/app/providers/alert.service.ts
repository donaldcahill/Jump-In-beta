import { Injectable } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  isAlert = false;
  constructor(
    public alertController: AlertController,
    public navController: NavController) { }
  async present(titulo: string, mensaje: string) {
    this.isAlert = true;
    return await this.alertController.create({
      header: titulo,
      message: mensaje,
      buttons: ['Aceptar']
    }).then( a => {
      const datoa: any = a;
      datoa.present().then( () => {
        console.log('Alert Present');
      });
    });
  }
  async dismiss() {
    this.isAlert = false;
    return await this.alertController.dismiss().then( () => {
      console.log('Dismiss Alert');
    });
  }

  async presentAlertConfirm(titulo: string, mensaje: string, irPagina: string) {
    this.isAlert = true;
    return await this.alertController.create({
      header: titulo,
      message: mensaje,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'verdeo',
          handler: () => {
            console.log('cancelado');
          }
        },
        {
          text: 'Aceptar',
          cssClass: 'verdeo',
          handler: () => {
            console.log('Confirm Okay');
            this.navController.navigateRoot(irPagina);
          }
        }
      ]
    }).then( a => {
      const datoa: any = a;
      datoa.present().then( () => {
        console.log('Alert Confirm Present');
      });
    });
  }
}
