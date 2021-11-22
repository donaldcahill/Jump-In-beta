import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Languages } from "./Languages";
import { PayOptions } from "./PayOptions";
import { UsersOperators } from "./UsersOperators";
import { ApiProperty } from '@nestjs/swagger';

@Index("UK_user_email", ["email"], { unique: true })
@Index("UK_user_phone", ["phone"], { unique: true })
@Index("IXFK_user_languages", ["idLanguage"], {})
@Index("IXFK_user_pay_option", ["idPayOption"], {})
@Entity("users", { schema: "jih" })
export class Users {
  @ApiProperty({ example: 1, description: 'User identificator' })
  @PrimaryGeneratedColumn({ type: "bigint", name: "id_user" })
  idUser: string;

  @ApiProperty({ example: 1, description: 'Option pay selected' })
  @Column("bigint", { name: "id_pay_option" })
  idPayOption: string;

  @ApiProperty({ example: 1, description: 'Native language' })
  @Column("bigint", { name: "id_language" })
  idLanguage: string;

  @ApiProperty({ example: 1, description: 'Country identificator' })
  @Column("bigint", { name: "id_country", nullable: true })
  idCountry: string | null;

  @ApiProperty({ example: 'Pepe Pedro Perez Peralta', description: 'Full Name' })
  @Column("text", { name: "name" })
  name: string;

  @ApiProperty({ example: 59175145987, description: 'User phone' })
  @Column("varchar", { name: "phone", unique: true, length: 150 })
  phone: string;

  @ApiProperty({ example: 'example@example.com', description: 'email' })
  @Column("varchar", { name: "email", unique: true, length: 300 })
  email: string;

  @ApiProperty({ example: '***********', description: 'Password' })
  @Column("text", { name: "pass" })
  pass: string;

  @ApiProperty({ example: '2021-02-02 00:00:00', description: 'Register date' })
  @Column("datetime", { name: "registration_date" })
  registrationDate: Date;

  @ApiProperty({ example: true, description: 'Active or inactive user' })
  @Column("tinyint", { name: "state", width: 1 })
  state: boolean;

  @ManyToOne(() => Languages, (languages) => languages.users, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "id_language", referencedColumnName: "idLanguage" }])
  idLanguage2: Languages;

  @ManyToOne(() => PayOptions, (payOptions) => payOptions.users, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "id_pay_option", referencedColumnName: "idPayOption" }])
  idPayOption2: PayOptions;

  @OneToMany(() => UsersOperators, (usersOperators) => usersOperators.idUser2)
  usersOperators: UsersOperators[];
}
