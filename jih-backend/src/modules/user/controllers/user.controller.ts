import { UserValidator } from '../../../dto/user-validator.dto';
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { Users } from '../../../models/Users';
import { LoginDto } from '../../../dto/login.dto';
import { UsersOperators } from '../../../models/UsersOperators';
import { GlobalDto } from '../../../dto/global.dto';


@Controller('user')
export class UserController {
    constructor(
        private userService: UserService
    ){}
    @Post('create-user')
    createUser(@Body() user: Users): Promise<Users>{
        console.log(user)
        return this.userService.createUser(user);
    }
    @Post('login-user')
    findUserByUserPass(@Body() login: LoginDto):Promise<Users> {
        return this.userService.findUserByUserPass(login.user, login.pass);
    }
    @Get('operator-by-user/:id')
    findUserOperatorByUser(@Param('id') idUser: string): Promise<UsersOperators[]> {
        return this.userService.findUserOperatorByUser(idUser);
    }
    @Get('create-user-operators')
    createUserOperators(@Body() userOperator: UsersOperators): Promise<UsersOperators> {
        return this.userService.createUserOperators(userOperator);
    }
    @Post('user-validate')
    findUserByIdAndEmail(@Body() request: UserValidator):Promise<GlobalDto> {
        return this.userService.findUserByIdAndEmail(request);
    }
    @Get('email-validate/:email')
    validateEmail(@Param('email') email: string): Promise<GlobalDto>{
        return this.userService.validateEmail(email);
    }

    
}
