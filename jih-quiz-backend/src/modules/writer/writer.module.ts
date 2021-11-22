import { User } from './../../model/User';
import { Module } from '@nestjs/common';
import { WriterService } from './services/writer.service';
import { WriterController } from './controllers/writer.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Answer } from '../../model/Answer';
import { Category } from '../../model/Category';
import { Question } from '../../model/Question';
import { Result } from '../../model/Result';
import { Writer } from '../../model/Writer';
import { History } from '../../model/History';
import { Points } from 'src/model/Points';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Answer,
      Category,
      History,
      Question,
      Result,
      User,
      Writer,
      Points,
    ]),
  ],
  providers: [WriterService],
  controllers: [WriterController]
})
export class WriterModule { }
