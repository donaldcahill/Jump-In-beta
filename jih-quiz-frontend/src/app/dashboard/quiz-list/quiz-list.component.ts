import { Component, OnInit } from '@angular/core';
import { Writer } from '../../dto/Writer';
import { Router } from '@angular/router';
import { QuizApiService } from '../../providers/quiz-api.service';
import { DatosUsuarioService } from '../../providers/datos-usuario.service';
import { Question } from '../../dto/Question';
import { DataParsingService } from 'src/app/providers/data-parsing.service';
import { History } from '../../dto/History';
import { QuizService } from '../../providers/quiz.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-quiz-list',
  templateUrl: './quiz-list.component.html',
  styleUrls: ['./quiz-list.component.scss']
})
export class QuizListComponent implements OnInit {

  public writer: Writer = <Writer>{};
  public history: History = <History>{};
  public lstQuestion: Question[] = [];

  constructor(
    private router: Router,
    private apiQuiz: QuizApiService,
    private storageService: DatosUsuarioService,
    private dataParsingService: DataParsingService,
    private quizService: QuizService,
    private location: Location
  ) { }

  ngOnInit(): void {
    if (!this.dataParsingService.get()) {
      this.router.navigate(["/dashboard/history-list"]);
    }
    this.history = this.dataParsingService.get();
    this.writer = Object.assign(this.storageService.getStorage());

    this.getHistories();
  }

  async getHistories() {
    this.lstQuestion = await this.apiQuiz.getGlobal<Question[]>(
      "/writers/question/history/get/" + this.history.idHistory
    );
    console.log(this.lstQuestion);
  }
  async questionRegister() {
    this.quizService.set(undefined);
    this.router.navigate(["/dashboard/quiz-register"]);
  }

  editQuiz(item: Question) {
    this.quizService.set(item);
    this.router.navigate(["/dashboard/quiz-register"]);
  }
  deleteQuiz(item: Question) {

  }
  back(): void {
    this.location.back();
  }

}
