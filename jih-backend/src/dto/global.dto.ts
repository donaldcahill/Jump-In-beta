import { ApiProperty } from '@nestjs/swagger';
export class GlobalDto {
    
    @ApiProperty({ example: 1, description: 'Error message or success' })
    message: string;

    @ApiProperty({ example: true, description: 'Response type,' })
    state: boolean
}