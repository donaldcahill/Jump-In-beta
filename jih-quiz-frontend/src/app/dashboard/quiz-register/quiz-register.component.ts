import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Writer } from '../../dto/Writer';
import { Question } from '../../dto/Question';
import { Router } from '@angular/router';
import { QuizApiService } from '../../providers/quiz-api.service';
import { DatosUsuarioService } from '../../providers/datos-usuario.service';
import { ToastService } from '../../providers/toast.service';
import { Answer } from 'src/app/dto/Answer';
import { DataParsingService } from 'src/app/providers/data-parsing.service';
import { History } from '../../dto/History';
import { QuizService } from '../../providers/quiz.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-quiz-register',
  templateUrl: './quiz-register.component.html',
  styleUrls: ['./quiz-register.component.scss']
})
export class QuizRegisterComponent implements OnInit {


  firstFormGroup: FormGroup = <FormGroup>{};
  secondFormGroup: FormGroup = <FormGroup>{};
  public writer: Writer = <Writer>{};
  public question: Question = <Question>{};
  public lstAnswers: any[] = [];
  public answer: Answer = <Answer>{};
  private history: History = <History>{};

  isEditable = true;
  constructor(
    private router: Router,
    private apiQuiz: QuizApiService,
    private storageService: DatosUsuarioService,
    private _formBuilder: FormBuilder,
    private toastService: ToastService,
    private dataParsingService: DataParsingService,
    private quizService: QuizService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.history = this.dataParsingService.get();
    if (!this.history) {
      this.router.navigate(["/dashboard/history-list"]);
      return;
    }
    if (this.quizService.get()) {
      this.question = this.quizService.get();
      for (const iterator of this.question.answers) {
        this.lstAnswers.push({
          response: iterator.response,
          correct: iterator.correct
        });

      }
    }
    this.writer = Object.assign(this.storageService.getStorage());
    this.iniciarValidaciones();
    this.answer.correct = false;
  }

  iniciarValidaciones() {
    this.firstFormGroup = this._formBuilder.group({
      vQuestion: ["", Validators.required],

    });
    this.secondFormGroup = this._formBuilder.group({
      vResponse: ["", Validators.required],
      vIsCorrect: ["", Validators.required],
    });
  }
  get f(): any {
    return this.firstFormGroup.controls;
  }
  get f2(): any {
    return this.secondFormGroup.controls;
  }
  async addAnswer() {
    this.lstAnswers.push({
      response: this.answer.response,
      correct: this.answer.correct
    });

  }

  async registerQuiz() {
    this.question.idHistory = this.history.idHistory;
    this.question.answers = this.lstAnswers;
    if (this.lstAnswers.length >= 2) {
      let respuesta = await this.apiQuiz.postGlobal<Question>(
        "/writers/question/create-quiz",
        this.question
      );
      console.log(respuesta);
      if (respuesta.state) {
        this.router.navigate(["/dashboard/history-list"]);
      } else {
        this.toastService.message("The quiz was not registered");
      }
    } else {
      this.toastService.message("You must register at least 2 records.");
    }

  }

  async registerHistory() {
    // /writers/history/create
    this.question.state = true;
    this.question.idHistory = this.history.idHistory;

    let respuesta = await this.apiQuiz.postGlobal<Question>(
      "/writers/history/create",
      this.question
    );
    if (respuesta) {
      this.router.navigate(["/dashboard/history-list"]);
    } else {
      this.toastService.message("The history was not registered");
    }
  }
  back(): void {
    this.location.back();
  }
}
