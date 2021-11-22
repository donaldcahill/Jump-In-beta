import { Answer } from './Answer';
import { History } from './History';

export interface Question {
  idQuestion: string;
  idHistory: string;
  question: string;
  dateRegister: Date;
  state: number;
  answers?: Answer[];
  idHistory2?: History;
}
