import { Injectable } from '@angular/core';
import { Question } from '../../dto/Question';

@Injectable({
  providedIn: 'root',
})
export class QuestionsDataService {
  private questions: Question[];
  constructor() {}
  get() {
    return this.questions;
  }
  set(questions: Question[]) {
    this.questions = questions;
  }
}
