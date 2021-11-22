import { Question } from './Question';

export interface Answer {
  idAnswer: string;
  idQuestion: string;
  response: string;
  correct: number;
  dateRegister: Date;
  state: number;
  idQuestion2?: Question;
}
