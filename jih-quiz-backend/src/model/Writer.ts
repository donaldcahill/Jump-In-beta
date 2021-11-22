import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { History } from "./History";

@Index("UK_email_writer", ["email"], { unique: true })
@Entity("writer", { schema: "quiz" })
export class Writer {
  @PrimaryGeneratedColumn({ type: "bigint", name: "id_writer" })
  idWriter: string;

  @Column("text", { name: "name" })
  name: string;

  @Column("text", { name: "last_nabme" })
  lastNabme: string;

  @Column("varchar", { name: "email", unique: true, length: 350 })
  email: string;

  @Column("varchar", { name: "password", length: 250 })
  password: string;

  @Column("timestamp", {
    name: "date_register",
    default: () => "CURRENT_TIMESTAMP",
  })
  dateRegister: Date;

  @Column("tinyint", { name: "state" })
  state: number;

  @OneToMany(() => History, (history) => history.idWriter2)
  histories: History[];
}
