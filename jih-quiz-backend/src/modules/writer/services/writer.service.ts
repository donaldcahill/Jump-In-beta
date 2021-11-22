/* eslint-disable prefer-const */
import { LoginResponseDto } from './../../../dto/login-response.dto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getConnection, Repository } from 'typeorm';
import { Writer } from '../../../model/Writer';
import { Category } from '../../../model/Category';
import { History } from '../../../model/History';
import { Question } from '../../../model/Question';
import { Answer } from '../../../model/Answer';
import { LoginDto } from '../../../dto/login.dto';
import { GlobalDto } from '../../../dto/global.dto';

@Injectable()
export class WriterService {
  constructor(
    @InjectRepository(Writer)
    private readonly _writerRepository: Repository<Writer>,
    @InjectRepository(Category)
    private readonly _categoryRepository: Repository<Category>,
    @InjectRepository(History)
    private readonly _historyRepository: Repository<History>,
    @InjectRepository(Question)
    private readonly _questionRepository: Repository<Question>,
    @InjectRepository(Answer)
    private readonly _answerRepository: Repository<Answer>,
  ) { }
  async login(request: LoginDto) {
    let response: LoginResponseDto = <LoginResponseDto>{};
    try {
      response.user = await this._writerRepository.findOneOrFail({
        where: {
          email: request.email,
          password: request.password,
        },
      });
      if (response.user) {
        response.state = true;
        response.message = '';
      } else {
        response.state = false;
        response.message = 'Usuario o Contraseña Inválidos.';
      }
    } catch (e) {
      response.state = false;
      response.message = 'Usuario o Contraseña Inválidos.';
    } finally {
      return response;
    }
  }

  async writerRegister(writer: Writer): Promise<LoginResponseDto> {
    let response: LoginResponseDto = <LoginResponseDto>{};
    try {
      writer.dateRegister = new Date();
      let writerSaved = await this._writerRepository.save(writer);
      if (writerSaved) {
        response.user = writerSaved;
        response.state = true;
        response.message = '';
      } else {
        response.state = false;
        response.message = 'Error al registrar el usuario.';
      }
    } catch (e) {
      console.log(e);
      response.state = false;
      response.message = 'Error al registrar el usuario.';
    } finally {
      return response;
    }
  }
  getWriterById(id: number): Promise<Writer> {
    return this._writerRepository.findOne(id);
  }

  listWriter(): Promise<Writer[]> {
    return this._writerRepository.find();
  }

  async categoryRegister(category: Category): Promise<Category> {
    category.state = 1;
    console.log(category);
    return await this._categoryRepository.save(category);
  }
  getCategoryById(id: number): Promise<Category> {
    return this._categoryRepository.findOne(id);
  }
  listCategory(): Promise<Category[]> {
    return this._categoryRepository.find();
  }

  historyRegister(history: History): Promise<History> {
    history.dateRegister = new Date();

    return this._historyRepository.save(history);
  }
  getHistoryById(id: number): Promise<History> {
    return this._historyRepository.findOne(id);
  }
  listHistoryByUserId(userId: number): Promise<History[]> {
    return this._historyRepository.find({
      where: {
        idWriter: userId,
      },
      relations: ['idCategory2', 'questions', 'questions.answers'],
    });
  }

  historyContainQuestion(id: number): Promise<Question[]> {
    return this._questionRepository.find({
      where: {
        historyId: id,
      },
    });
  }
  answerContainCorrect(id: number): Promise<Answer[]> {
    return this._answerRepository.find({
      where: {
        questionId: id,
        correct: true,
      },
    });
  }

  questionRegister(question: Question): Promise<Question> {
    question.dateRegister = new Date();

    return this._questionRepository.save(question);
  }
  async quizRegister(question: Question): Promise<GlobalDto> {
    const res: GlobalDto = <GlobalDto>{};
    const connection = getConnection();
    const queryRunner = connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const detalleRepository = queryRunner.manager.getRepository(Question);
      const actividadRepository = queryRunner.manager.getRepository(Answer);
      question.dateRegister = new Date();
      question.state = 1;

      let questionSaved = await detalleRepository.save(question);
      if (questionSaved) {
        for (let item of question.answers) {
          item.idQuestion = questionSaved.idQuestion;
          item.state = 1;
          item.dateRegister = new Date();
          let answerSaved = await actividadRepository.save(item);
        }
        res.state = true;
        res.message = 'Actividad creada exitosamente';
        await queryRunner.commitTransaction();
      } else {
        res.state = false;
        res.message = 'Error al crear la actividad';
        await queryRunner.rollbackTransaction();
      }

    } catch (error) {
      res.state = false;
      res.message = 'Error al crear la actividad';
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
      return res;
    }
  }
  getQuestionById(id: number): Promise<Question> {
    return this._questionRepository.findOne(id);
  }

  //List questions by hystory
  listQuestionsByHistoryId(historyId: number): Promise<Question[]> {
    return this._questionRepository.find({
      where: {
        idHistory: historyId,
      },
      relations: ['idHistory2', 'answers'],
    });
  }

  answerRegister(answer: Answer): Promise<Answer> {
    answer.dateRegister = new Date();

    return this._answerRepository.save(answer);
  }

  listAnswersByQuestionId(questionId: number): Promise<Answer[]> {
    return this._answerRepository.find({
      where: {
        questionId: questionId,
      },
    });
  }
}
