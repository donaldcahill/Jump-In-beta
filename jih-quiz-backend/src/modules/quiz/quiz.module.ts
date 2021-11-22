import { User } from './../../model/User';
import { Module } from '@nestjs/common';
import { QuizService } from './services/quiz.service';
import { QuizController } from './controllers/quiz.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Answer } from '../../model/Answer';
import { Category } from '../../model/Category';
import { History } from '../../model/History';
import { Question } from '../../model/Question';
import { Result } from '../../model/Result';
import { Writer } from '../../model/Writer';
import { Points } from '../../model/Points';

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
  providers: [QuizService],
  controllers: [QuizController]
})
export class QuizModule { }
