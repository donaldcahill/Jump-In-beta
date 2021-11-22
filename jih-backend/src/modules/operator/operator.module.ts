import { UsersOperators } from './../../models/UsersOperators';
import { SupportLanguages } from './../../models/SupportLanguages';
import { Module } from '@nestjs/common';
import { OperatorService } from './services/operator.service';
import { OperatorController } from './controllers/operator.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Countries } from '../../models/Countries';
import { Languages } from '../../models/Languages';
import { Operators } from '../../models/Operators';
import { PayOptions } from '../../models/PayOptions';
import { Users } from '../../models/Users';

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
  providers: [OperatorService],
  controllers: [OperatorController]
})
export class OperatorModule {}
