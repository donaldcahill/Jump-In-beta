import { Component, OnInit } from '@angular/core';
import { History } from '../../dto/History';
import { HistoryDataService } from '../providers/history-data.service';
import { Router } from '@angular/router';
import { QuizService } from '../providers/quiz.service';
import { Question } from '../../dto/Question';
import { QuestionsDataService } from '../providers/questions-data.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
})
export class HistoryPage implements OnInit {
  public history: History = {} as History;
  constructor(
    public historyService: HistoryDataService,
    public router: Router,
    public quizService: QuizService,
    public questionService: QuestionsDataService
  ) {}

  ngOnInit() {
    this.obtenerHistoria();
  }

  async obtenerHistoria() {
    const resultado = await this.historyService.get();
    if (resultado) {
      this.history = resultado;
      console.log(this.history);
    } else {
      this.router.navigateByUrl('');
    }
  }
  async goToQuestion() {
    console.log(this.history);
    const questions: Question[] = await this.quizService.getGlobal<Question[]>(
      '/quiz/generate-question/' + this.history.idHistory
    );
    console.log(questions);
    this.questionService.set(questions);
    this.router.navigateByUrl('/question');
  }
}
