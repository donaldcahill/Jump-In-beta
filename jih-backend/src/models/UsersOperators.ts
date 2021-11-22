import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Operators } from "./Operators";
import { Users } from "./Users";
import { ApiProperty } from '@nestjs/swagger';

@Index("IXFK_user_operator_operator", ["idOperator"], {})
@Index("IXFK_user_operator_user", ["idUser"], {})
@Entity("users_operators", { schema: "jih" })
export class UsersOperators {
  @ApiProperty({ example: 1, description: 'User operator identificator' })
  @PrimaryGeneratedColumn({ type: "bigint", name: "id_user_operator" })
  idUserOperator: string;

  @ApiProperty({ example: 1, description: 'User identificator' })
  @Column("bigint", { name: "id_user" })
  idUser: string;

  @ApiProperty({ example: 1, description: 'Operator identificator' })
  @Column("bigint", { name: "id_operator" })
  idOperator: string;

  @ApiProperty({ example: 'Lorem ipsum.....', description: 'User comments' })
  @Column("text", { name: "comments", nullable: true })
  comments: string | null;

  @ApiProperty({ example: 5, description: 'call calification' })
  @Column("int", { name: "qualification", nullable: true })
  qualification: number | null;

  @ApiProperty({ example: '2021-01-01 00:00:00', description: 'Register date' })
  @Column("datetime", { name: "registration_date" })
  registrationDate: Date;

  @ApiProperty({ example: true, description: 'Active or inactive' })
  @Column("tinyint", { name: "state", width: 1 })
  state: boolean;

  @ManyToOne(() => Operators, (operators) => operators.usersOperators, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "id_operator", referencedColumnName: "idOperator" }])
  idOperator2: Operators;

  @ManyToOne(() => Users, (users) => users.usersOperators, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "id_user", referencedColumnName: "idUser" }])
  idUser2: Users;
}
