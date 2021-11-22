import { Injectable } from '@angular/core';
import { Question } from '../dto/Question';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  private quiz: Question = <Question>{};
  constructor() { }

  get(): Question {
    return this.quiz;
  }
  set(quiz: any) {
    this.quiz = quiz;
  }
}
