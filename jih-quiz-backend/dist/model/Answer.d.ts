import { Question } from "./Question";
export declare class Answer {
    idAnswer: string;
    idQuestion: string;
    response: string;
    correct: number;
    dateRegister: Date;
    state: number;
    idQuestion2: Question;
}
