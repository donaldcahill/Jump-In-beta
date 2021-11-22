import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Question } from "./Question";

@Index("IXFK_answer_question", ["idQuestion"], {})
@Entity("answer", { schema: "quiz" })
export class Answer {
  @PrimaryGeneratedColumn({ type: "bigint", name: "id_answer" })
  idAnswer: string;

  @Column("bigint", { name: "id_question" })
  idQuestion: string;

  @Column("text", { name: "response" })
  response: string;

  @Column("tinyint", { name: "correct" })
  correct: number;

  @Column("timestamp", {
    name: "date_register",
    default: () => "CURRENT_TIMESTAMP",
  })
  dateRegister: Date;

  @Column("tinyint", { name: "state" })
  state: number;

  @ManyToOne(() => Question, (question) => question.answers, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "id_question", referencedColumnName: "idQuestion" }])
  idQuestion2: Question;
}
