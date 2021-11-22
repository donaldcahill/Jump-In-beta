import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { SupportLanguages } from "./SupportLanguages";
import { Users } from "./Users";
import { ApiProperty } from '@nestjs/swagger';

@Entity("languages", { schema: "jih" })
export class Languages {
  @ApiProperty({ example: 1, description: 'Language identificator' })
  @PrimaryGeneratedColumn({ type: "bigint", name: "id_language" })
  idLanguage: string;

  @ApiProperty({ example: 'ES', description: 'Abreviation for de language' })
  @Column("varchar", { name: "abreviation", length: 3 })
  abreviation: string;

  @ApiProperty({ example: 'SPANISH', description: 'Language Description' })
  @Column("text", { name: "description" })
  description: string;

  @ApiProperty({ example: true, description: 'Active or inactive' })
  @Column("tinyint", { name: "state", width: 1 })
  state: boolean;

  @OneToMany(
    () => SupportLanguages,
    (supportLanguages) => supportLanguages.idLanguage2
  )
  supportLanguages: SupportLanguages[];

  @OneToMany(() => Users, (users) => users.idLanguage2)
  users: Users[];
}
