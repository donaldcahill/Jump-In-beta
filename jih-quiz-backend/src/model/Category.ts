import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { History } from "./History";

@Entity("category", { schema: "quiz" })
export class Category {
  @PrimaryGeneratedColumn({ type: "bigint", name: "id_category" })
  idCategory: string;

  @Column("varchar", { name: "title", length: 250 })
  title: string;

  @Column("text", { name: "description" })
  description: string;

  @Column("tinyint", { name: "state" })
  state: number;

  @OneToMany(() => History, (history) => history.idCategory2)
  histories: History[];
}
