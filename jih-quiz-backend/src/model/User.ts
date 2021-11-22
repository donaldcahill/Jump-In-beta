import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Points } from "./Points";
import { Result } from "./Result";

@Index("UK_email_user", ["email"], { unique: true })
@Entity("user", { schema: "quiz" })
export class User {
  @PrimaryGeneratedColumn({ type: "bigint", name: "id_user" })
  idUser: string;

  @Column("text", { name: "first_name" })
  firstName: string;

  @Column("text", { name: "last_name" })
  lastName: string;

  @Column("varchar", { name: "email", unique: true, length: 350 })
  email: string;

  @Column("text", { name: "password" })
  password: string;

  @Column("timestamp", {
    name: "date_register",
    default: () => "CURRENT_TIMESTAMP",
  })
  dateRegister: Date;

  @Column("tinyint", { name: "state" })
  state: number;

  @OneToMany(() => Points, (points) => points.idUser2)
  points: Points[];

  @OneToMany(() => Result, (result) => result.idUser2)
  results: Result[];
}
