import { Category } from "./Category";
import { Writer } from "./Writer";
import { Question } from "./Question";
import { Result } from "./Result";
export interface History {
  idHistory: string;
  idCategory: string;
  idWriter: string;
  title: string;
  content: string;
  url: string;
  dateRegister: Date;
  state: boolean;
  idCategory2: Category;
  idWriter2: Writer;
  questions: Question[];
  results: Result[];
}