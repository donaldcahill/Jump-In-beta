import { Component, OnInit } from '@angular/core';
import { ContratsService } from '../providers/contrats.service';
import { UserDataService } from '../providers/user-data.service';
import { QuizService } from '../providers/quiz.service';
import { User } from '../../dto/User';

import { Router } from '@angular/router';
import { Points } from '../../dto/Points';
import { Result } from '../../dto/Result';
import { AlertController } from '@ionic/angular';
import { HistoryDataService } from '../providers/history-data.service';

@Component({
  selector: 'app-congrats',
  templateUrl: './congrats.page.html',
  styleUrls: ['./congrats.page.scss'],
})
export class CongratsPage implements OnInit {
  mensaje: string;
  puntuacion = 0;
  user: User = {} as User;
  aprobado = false;
  constructor(
    private contratService: ContratsService,
    private userService: UserDataService,
    public router: Router,
    public quizService: QuizService,
    public alertController: AlertController,
    public historyService: HistoryDataService
  ) { }

  ngOnInit() {
    this.cargarContrats();
  }
  cargarContrats() {
    this.puntuacion = this.contratService.get();
    this.user = this.userService.get();
    console.log(this.user);
    if (this.puntuacion >= 3) {
      this.aprobado = true;
    }
    else {
      this.aprobado = false;
    }
  }
  async goToHome() {
    try {
      const datos: Points = {} as Points;
      datos.idUser = this.user.idUser;
      datos.ammount = this.puntuacion.toString();
      datos.state = true;
      if (this.aprobado) {
        //register-points
        const resultado: Result = {} as Result;
        resultado.idUser = this.user.idUser;
        resultado.idHistory = this.historyService.get().idHistory;
        resultado.points = this.puntuacion.toString();
        resultado.state = 1;
        const puntos = await this.quizService.postGlobal<Points>('/quiz/register-points', datos);
        const res = await this.quizService.postGlobal<Result>('/quiz/register-result', resultado);
      } else {
        const puntos = await this.quizService.postGlobal<Points>('/quiz/register-points', datos);
      }
    } catch (e) {
      console.log(e);
      const alert = await this.alertController.create({
        header: 'Alert',
        message: 'There was an error recording the data.',
        buttons: [{
          text: 'Okay',
          handler: () => {
            this.router.navigateByUrl('/home');
          }
        }]
      });
      await alert.present();
      const { role } = await alert.onDidDismiss();
      console.log('onDidDismiss resolved with role', role);
    }
    this.router.navigateByUrl('/home');
  }
}
