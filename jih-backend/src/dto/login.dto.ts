import { ApiProperty } from '@nestjs/swagger';
export class LoginDto {
    @ApiProperty({ example: 'example@example.com', description: 'User login' })
    user:string;
    @ApiProperty({ example: '*********', description: 'Password' })
    pass: string;
}