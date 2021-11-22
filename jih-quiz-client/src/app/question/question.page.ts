import { Component, OnInit } from '@angular/core';
import { Subscription, timer } from 'rxjs';
import { QuestionsDataService } from '../providers/questions-data.service';
import { Question } from '../../dto/Question';
import { Answer } from '../../dto/Answer';
import { Router } from '@angular/router';
import { ContratsService } from '../providers/contrats.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.page.html',
  styleUrls: ['./question.page.scss'],
})
export class QuestionPage implements OnInit {
  porcentaje = 0;
  second = 1000;
  minute = this.second * 60;
  source = timer(0, 1000);
  numPregunta = 0;
  cantidadMonedas = 123;
  correctas = 0;
  clase = 'normal';
  pregunta = `Presently, who is the capitain of the Indian's  Women's T20 international team?`;


  countDown: Subscription;
  counter = 20;
  tick = 1000;

  public lstQuestion: Question[] = [];
  constructor(
    public questionService: QuestionsDataService,
    public router: Router,
    public congratsService: ContratsService

  ) {
    console.log(this.numPregunta);
  }

  ngOnInit() {
    console.log('init');
    if (this.questionService.get()) {
      this.lstQuestion = this.questionService.get();
      console.log(this.lstQuestion);
    } else {
      this.router.navigateByUrl('home');
    }
    //this.iniciarConteo();

  }
  iniciarConteo() {
    this.countDown = timer(0, this.tick)
    .subscribe(() => --this.counter);
  }
  detenerConteo() {
    this.countDown=null;
  }
  start() {
    //window.setInterval(() => {
    const distance = 60;
    this.porcentaje = Math.floor((distance % this.minute) / this.second);
    //}, 4000);
  }
  validarPregunta(item: Answer) {
    console.log(item);
    if (this.numPregunta < this.lstQuestion.length) {
      if (!(this.numPregunta === (this.lstQuestion.length - 1))) {
        this.numPregunta = this.numPregunta + 1;
        if (item.correct === 1) {
          this.clase = 'success';
          this.correctas = this.correctas + 1;
        } else if (item.correct === 0) {
          this.clase = 'error';
        } else {
          this.clase = 'normal';
        }
      } else {
        this.congratsService.set(this.correctas);
        console.log(this.correctas);
        this.router.navigateByUrl('congrats');
      }
    } else {
      console.log('fin');
    }
    console.log(this.numPregunta);
  }
}
