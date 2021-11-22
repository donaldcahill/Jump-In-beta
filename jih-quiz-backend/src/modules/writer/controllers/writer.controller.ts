import { GlobalDto } from './../../../dto/global.dto';
import { LoginResponseDto } from './../../../dto/login-response.dto';
import { LoginDto } from './../../../dto/login.dto';
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { WriterService } from '../services/writer.service';
import { Writer } from '../../../model/Writer';
import { Category } from '../../../model/Category';
import { History } from '../../../model/History';
import { Question } from '../../../model/Question';
import { Answer } from '../../../model/Answer';

@Controller('writers')
export class WriterController {
  constructor(private writerService: WriterService) {}
  @Post('writer/login')
  async login(@Body() writer: LoginDto): Promise<LoginResponseDto> {
    return await this.writerService.login(writer);
  }

  @Get('writer/list')
  async getAllWriters() {
    return await this.writerService.listWriter();
  }

  @Post('writer/create')
  async createWriter(@Body() writer: Writer) {
    return await this.writerService.writerRegister(writer);
  }

  @Get('writer/get/:id')
  async getWriterById(@Param('id') id: number) {
    return await this.writerService.getWriterById(id);
  }

  @Post('category/create')
  async createCategory(@Body() category: Category) {
    return await this.writerService.categoryRegister(category);
  }

  @Get('category/list')
  async getAllCategories() {
    return await this.writerService.listCategory();
  }
  @Get('category/get/:id')
  async getCategoryById(@Param('id') id: number) {
    return await this.writerService.getCategoryById(id);
  }

  @Post('history/create')
  async createHistory(@Body() history: History) {
    return await this.writerService.historyRegister(history);
  }

  @Get('history/get/:id')
  async getHistoryById(@Param('id') id: number) {
    return await this.writerService.getHistoryById(id);
  }

  @Get('history/user/get/:id')
  async listHistoryByUserId(@Param('id') id: number) {
    return await this.writerService.listHistoryByUserId(id);
  }

  @Post('question/create')
  async createQuestion(@Body() question: Question) {
    return await this.writerService.questionRegister(question);
  }
  @Post('question/create-quiz')
  async quizRegister(@Body() question: Question): Promise<GlobalDto> {
    return await this.writerService.quizRegister(question);
  }

  @Get('question/get/:id')
  async getQuestionById(@Param('id') id: number) {
    return await this.writerService.getQuestionById(id);
  }
  @Get('question/history/get/:id')
  async listQuestionByHistoryId(@Param('id') id: number) {
    return await this.writerService.listQuestionsByHistoryId(id);
  }

  @Post('answer/create')
  async createAnswer(@Body() answer: Answer) {
    return await this.writerService.answerRegister(answer);
  }

  @Get('answer/get/:id')
  async listAnswersByQuestionId(@Param('id') id: number) {
    return await this.writerService.listAnswersByQuestionId(id);
  }

  @Get('hystory/contain/question/:id')
  async listHistoryByQuestionId(@Param('id') id: number) {
    return await this.writerService.historyContainQuestion(id);
  }

  @Get('answer/contain/correct/:id')
  async listAnswerByQuestionId(@Param('id') id: number) {
    return await this.writerService.answerContainCorrect(id);
  }
}
