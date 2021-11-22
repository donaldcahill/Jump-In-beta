import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Languages } from "./Languages";
import { Operators } from "./Operators";
import { ApiProperty } from '@nestjs/swagger';

@Index("IXFK_support_languages_languages", ["idLanguage"], {})
@Index("IXFK_support_languages_operator", ["idOperator"], {})
@Entity("support_languages", { schema: "jih" })
export class SupportLanguages {
  @ApiProperty({ example: 1, description: 'Support language identificator' })
  @PrimaryGeneratedColumn({ type: "bigint", name: "id_support_language" })
  idSupportLanguage: string;

  @ApiProperty({ example: 1, description: 'Operator identifucator' })
  @Column("bigint", { name: "id_operator", nullable: true })
  idOperator: string | null;

  @ApiProperty({ example: 1, description: 'Language identificator' })
  @Column("bigint", { name: "id_language" })
  idLanguage: string;

  @ApiProperty({ example: '2021-01-01 00:00:00', description: 'Register Date' })
  @Column("datetime", { name: "register_date" })
  registerDate: Date;

  @ApiProperty({ example: true, description: 'Active or inactive' })
  @Column("tinyint", { name: "state", width: 1 })
  state: boolean;

  @ManyToOne(() => Languages, (languages) => languages.supportLanguages, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "id_language", referencedColumnName: "idLanguage" }])
  idLanguage2: Languages;

  @ManyToOne(() => Operators, (operators) => operators.supportLanguages, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "id_operator", referencedColumnName: "idOperator" }])
  idOperator2: Operators;
}
