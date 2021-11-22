import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Answer } from "./Answer";
import { History } from "./History";

@Index("IXFK_question_history", ["idHistory"], {})
@Entity("question", { schema: "quiz" })
export class Question {
  @PrimaryGeneratedColumn({ type: "bigint", name: "id_question" })
  idQuestion: string;

  @Column("bigint", { name: "id_history" })
  idHistory: string;

  @Column("text", { name: "question" })
  question: string;

  @Column("timestamp", {
    name: "date_register",
    default: () => "CURRENT_TIMESTAMP",
  })
  dateRegister: Date;

  @Column("tinyint", { name: "state" })
  state: number;

  @OneToMany(() => Answer, (answer) => answer.idQuestion2)
  answers: Answer[];

  @ManyToOne(() => History, (history) => history.questions, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "id_history", referencedColumnName: "idHistory" }])
  idHistory2: History;
}
