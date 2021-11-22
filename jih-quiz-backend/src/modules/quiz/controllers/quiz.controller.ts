import { History } from './../../../model/History';
import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { QuizService } from '../services/quiz.service';
import { User } from '../../../model/User';
import { Result } from '../../../model/Result';
import { Points } from '../../../model/Points';
import { Category } from '../../../model/Category';
import { Question } from '../../../model/Question';

@Controller('quiz')
export class QuizController {
  constructor(private quizService: QuizService) {}

  //create post method for generate user
  @Post('generate-random')
  async generateUser(): Promise<User> {
    return await this.quizService.generateUser();
  }

  // implement the function listHistoryByCategory for quizService
  @Get('list-by-category/:id')
  async listHistoryByCategory(@Param('id') id: number): Promise<History[]> {
    return this.quizService.listHistoryByCategory(id);
  }

  // generate implementation for generateQuestion method
  @Get('generate-question/:idHistory')
  async generateQuestion(
    @Param('idHistory') idHistory: number,
  ): Promise<Question[]> {
    return await this.quizService.generateQuestion(idHistory);
  }

  @Post('create-user')
  async createUser(@Body() user: User): Promise<User> {
    return await this.quizService.createUser(user);
  }

  @Post('register-result')
  async registerResult(@Body() result: Result): Promise<Result> {
    return await this.quizService.registerResult(result);
  }
  @Post('register-points')
  async registerPoints(@Body() points: Points): Promise<Points> {
    return await this.quizService.registerPoints(points);
  }
  @Get('list-category')
  async listCategory(): Promise<Category[]> {
    return await this.quizService.listCategory();
  }
  @Get('get-history-by-category/:id')
  async generateHistoryByCategoryId(
    @Param('id') categoryId: number,
  ): Promise<History> {
    return await this.quizService.generateHistoryByCategoryId(categoryId);
  }
  @Get('list-history-by-category/:id')
  async listHistoryByCategoryId(@Param('id') id: number): Promise<History[]> {
    return await this.quizService.listHistoryByCategoryId(id);
  }

  @Get('get-poinst-by-user/:id')
  async getPointsByUserId(@Param('id') userId: number): Promise<number> {
    return await this.quizService.getPointsByUserId(userId);
  }
  @Get('get-result-by-user/:id')
  async getResultByUserId(@Param('id') userId: number): Promise<number> {
    return await this.quizService.getResultByUserId(userId);
  }

  @Post('login')
  async loginUser(
    @Body() data: { email: string; password: string },
  ): Promise<User> {
    return await this.quizService.loginUser(data.email, data.password);
  }

  @Get('get-user/:id')
  async getUserById(@Param('id') userId: number): Promise<User> {
    return await this.quizService.getUserById(userId);
  }
}
