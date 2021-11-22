import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { History } from "./History";
import { User } from "./User";

@Index("IXFK_result_history", ["idHistory"], {})
@Index("IXFK_result_usuario", ["idUser"], {})
@Entity("result", { schema: "quiz" })
export class Result {
  @PrimaryGeneratedColumn({ type: "bigint", name: "id_result" })
  idResult: string;

  @Column("bigint", { name: "id_user" })
  idUser: string;

  @Column("bigint", { name: "id_history" })
  idHistory: string;

  @Column("decimal", { name: "points", precision: 65, scale: 2 })
  points: string;

  @Column("timestamp", {
    name: "date_register",
    default: () => "CURRENT_TIMESTAMP",
  })
  dateRegister: Date;

  @Column("tinyint", { name: "state" })
  state: number;

  @ManyToOne(() => History, (history) => history.results, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "id_history", referencedColumnName: "idHistory" }])
  idHistory2: History;

  @ManyToOne(() => User, (user) => user.results, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "id_user", referencedColumnName: "idUser" }])
  idUser2: User;
}
