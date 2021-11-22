import { GlobalDto } from './global.dto';

import { Operators } from '../models/Operators';
import { ApiProperty } from '@nestjs/swagger';
export class ResOperadorDto extends GlobalDto{
    @ApiProperty({ example: 'Operators...', description: 'Operators object' })
    operator: Operators;
}