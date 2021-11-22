import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Users } from "./Users";
import { ApiProperty } from '@nestjs/swagger';

@Entity("pay_options", { schema: "jih" })
export class PayOptions {
  @ApiProperty({ example: 1, description: 'Pay identificator' })
  @PrimaryGeneratedColumn({ type: "bigint", name: "id_pay_option" })
  idPayOption: string;

  @ApiProperty({ example: 9.99, description: 'amount' })
  @Column("decimal", { name: "amount", precision: 10, scale: 2 })
  amount: string;

  @ApiProperty({ example: '$9.99 - 10 assisted calls...', description: 'Desription for the pay' })
  @Column("text", { name: "description" })
  description: string;

  @ApiProperty({ example: true, description: 'Active or inactive' })
  @Column("tinyint", { name: "state", width: 1 })
  state: boolean;

  @OneToMany(() => Users, (users) => users.idPayOption2)
  users: Users[];
}
