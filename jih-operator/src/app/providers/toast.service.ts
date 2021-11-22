import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(
    public toastController: ToastController
  ) { }

  async toastSoloMensaje(mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000
    });
    toast.present();
  }

  async toastBotones(titulo: string, mensaje: string) {
    const toast = await this.toastController.create({
      header: titulo,
      message: mensaje,
      position: 'bottom',
      buttons: [
        {
          side: 'start',
          icon: 'star',
          text: 'Favorite',
          handler: () => {
            console.log('Favorite clicked');
          }
        }, {
          text: 'Done',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    toast.present();
  }

  async toastMensaje(titulo: string, mensaje: string) {
    const toast = await this.toastController.create({
      header: titulo,
      message: mensaje,
      position: 'bottom',
      duration: 2000
    });
    toast.present();
  }
}
