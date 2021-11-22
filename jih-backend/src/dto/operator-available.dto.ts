import { GlobalDto } from './global.dto';

import { Operators } from '../models/Operators';
import { ApiProperty } from '@nestjs/swagger';
export class OperatorAvailableDto extends GlobalDto {
    @ApiProperty({ example: 'operator...', description: 'Operator object' })
    operator: Operators
}