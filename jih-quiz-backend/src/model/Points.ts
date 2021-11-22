import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./User";

@Index("FK_points_user", ["idUser"], {})
@Entity("points", { schema: "quiz" })
export class Points {
  @PrimaryGeneratedColumn({ type: "bigint", name: "id_points" })
  idPoints: string;

  @Column("bigint", { name: "id_user" })
  idUser: string;

  @Column("decimal", {
    name: "ammount",
    precision: 50,
    scale: 2,
    default: () => "'0.00'",
  })
  ammount: string;

  @Column("tinyint", { name: "state", nullable: true, width: 1 })
  state: boolean | null;

  @ManyToOne(() => User, (user) => user.points, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "id_user", referencedColumnName: "idUser" }])
  idUser2: User;
}
