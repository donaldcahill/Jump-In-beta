import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Countries } from "./Countries";
import { SupportLanguages } from "./SupportLanguages";
import { UsersOperators } from "./UsersOperators";
import { ApiProperty } from '@nestjs/swagger';

@Index("UK_operator_email", ["email"], { unique: true })
@Index("UK_operator_phone_number", ["phoneNumber"], { unique: true })
@Index("IXFK_operator_country", ["idCountry"], {})
@Entity("operators", { schema: "jih" })
export class Operators {
  @ApiProperty({ example: 1, description: 'Identificator for the operator' })
  @PrimaryGeneratedColumn({ type: "bigint", name: "id_operator" })
  idOperator: string;

  @ApiProperty({ example: 1, description: 'Countrie identificator' })
  @Column("bigint", { name: "id_country" })
  idCountry: string;

  @ApiProperty({ example: 'Juan Perez Morales', description: 'Full name' })
  @Column("text", { name: "name" })
  name: string;

  @ApiProperty({ example: '********', description: 'The passs' })
  @Column("varchar", { name: "pass", length: 50 })
  pass: string;

  @ApiProperty({ example: 59175145987, description: 'The number operator' })
  @Column("varchar", { name: "phone_number", unique: true, length: 150 })
  phoneNumber: string;

  @ApiProperty({ example: 'example@example.com', description: 'Email' })
  @Column("varchar", { name: "email", unique: true, length: 300 })
  email: string;

  @ApiProperty({ example: '2021-01-01 00:00:00', description: 'Date register' })
  @Column("datetime", { name: "date" })
  date: Date;

  @ApiProperty({ example: true, description: 'Active or inactive' })
  @Column("int", { name: "state" })
  state: number;

  @ManyToOne(() => Countries, (countries) => countries.operators, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "id_country", referencedColumnName: "idCountry" }])
  idCountry2: Countries;

  @OneToMany(
    () => SupportLanguages,
    (supportLanguages) => supportLanguages.idOperator2
  )
  supportLanguages: SupportLanguages[];

  @OneToMany(
    () => UsersOperators,
    (usersOperators) => usersOperators.idOperator2
  )
  usersOperators: UsersOperators[];
}
