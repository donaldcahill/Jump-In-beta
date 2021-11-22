import { SupportLanguages } from './../../models/SupportLanguages';
import { Module } from '@nestjs/common';
import { UserService } from './services/user.service';
import { UserController } from './controllers/user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Countries } from '../../models/Countries';
import { Languages } from '../../models/Languages';
import { Operators } from '../../models/Operators';
import { PayOptions } from '../../models/PayOptions';
import { Users } from '../../models/Users';
import { UsersOperators } from '../../models/UsersOperators';

@Module({
  imports:[
    TypeOrmModule.forFeature([
      Countries,
      Languages,
      Operators,
      PayOptions,
      SupportLanguages,
      Users,
      UsersOperators
    ]),
  ],
  providers: [UserService],
  controllers: [UserController]
})
export class UserModule {}
