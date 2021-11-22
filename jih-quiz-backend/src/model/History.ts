import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Category } from "./Category";
import { Writer } from "./Writer";
import { Question } from "./Question";
import { Result } from "./Result";

@Index("IXFK_history_category", ["idCategory"], {})
@Index("IXFK_history_writer", ["idWriter"], {})
@Entity("history", { schema: "quiz" })
export class History {
  @PrimaryGeneratedColumn({ type: "bigint", name: "id_history" })
  idHistory: string;

  @Column("bigint", { name: "id_category" })
  idCategory: string;

  @Column("bigint", { name: "id_writer" })
  idWriter: string;

  @Column("varchar", { name: "title", length: 250 })
  title: string;

  @Column("text", { name: "content" })
  content: string;

  @Column("text", { name: "url", nullable: true })
  url: string | null;

  @Column("timestamp", {
    name: "date_register",
    default: () => "CURRENT_TIMESTAMP",
  })
  dateRegister: Date;

  @Column("tinyint", { name: "state" })
  state: number;

  @ManyToOne(() => Category, (category) => category.histories, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "id_category", referencedColumnName: "idCategory" }])
  idCategory2: Category;

  @ManyToOne(() => Writer, (writer) => writer.histories, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "id_writer", referencedColumnName: "idWriter" }])
  idWriter2: Writer;

  @OneToMany(() => Question, (question) => question.idHistory2)
  questions: Question[];

  @OneToMany(() => Result, (result) => result.idHistory2)
  results: Result[];
}
