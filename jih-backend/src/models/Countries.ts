import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Operators } from "./Operators";

@Entity("countries", { schema: "jih" })
export class Countries {
  @ApiProperty({ example: 1, description: 'Countrie identificator' })
  @PrimaryGeneratedColumn({ type: "bigint", name: "id_country" })
  idCountry: string;

  @ApiProperty({ example: 'Bolivia', description: 'The name countrie' })
  @Column("text", { name: "name_country" })
  nameCountry: string;

  @ApiProperty({ example: 591, description: 'Calling code for the countrie' })
  @Column("varchar", { name: "calling_code", nullable: true, length: 50 })
  callingCode: string | null;

  @ApiProperty({ example: 'BO', description: 'Alpha code' })
  @Column("varchar", { name: "alpha_code_2", length: 3 })
  alphaCode_2: string;

  @ApiProperty({ example: 'BOL', description: 'Alpha code 3 digits' })
  @Column("varchar", { name: "alpha_code_3", length: 4 })
  alphaCode_3: string;

  @ApiProperty({ example: '2021-05-01 00:11:22', description: 'Date register' })
  @Column("datetime", { name: "register_date" })
  registerDate: Date;

  @ApiProperty({ example: true, description: 'State for identify to active or inactive' })
  @Column("tinyint", { name: "state", width: 1 })
  state: boolean;

  @OneToMany(() => Operators, (operators) => operators.idCountry2)
  operators: Operators[];
}
