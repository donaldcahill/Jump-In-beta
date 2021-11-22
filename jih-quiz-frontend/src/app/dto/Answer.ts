import { Question } from "./Question";
export interface Answer {
  idAnswer: string;
  idQuestion: string;
  response: string;
  correct: boolean;
  dateRegister: Date;
  state: boolean;
  idQuestion2: Question;
}
