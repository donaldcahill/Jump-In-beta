import { Injectable } from "@angular/core";
import { Question } from "../dto/Question";

@Injectable({
  providedIn: "root",
})
export class QuestionService {
  private data: Question = <Question>{};
  constructor() {}

  get() {
    return this.data;
  }
  set(data: Question) {
    this.data = data;
  }
}
