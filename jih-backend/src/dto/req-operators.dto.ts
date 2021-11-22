import { SupportLanguages } from './../models/SupportLanguages';
import { Operators } from '../models/Operators';
import { ApiProperty } from '@nestjs/swagger';
export class ReqOperatorsDto {
    @ApiProperty({ example: 'Operator...', description: 'Object Operator' })
    operator: Operators;
    @ApiProperty({ example: 'SupportLanguages...', description: 'List of SupportLanguages' })
    languages: Array<SupportLanguages>
}