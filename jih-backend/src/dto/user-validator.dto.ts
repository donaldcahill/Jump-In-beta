import { ApiProperty } from '@nestjs/swagger';
export class UserValidator{
    @ApiProperty({ example: 1, description: 'User identificator id' })
    idUser: string;
    @ApiProperty({ example: 'example@example.com', description: 'User login' })
    user: string;
}