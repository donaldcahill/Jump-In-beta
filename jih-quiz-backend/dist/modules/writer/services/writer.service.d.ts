import { LoginResponseDto } from './../../../dto/login-response.dto';
import { Repository } from 'typeorm';
import { Writer } from '../../../model/Writer';
import { Category } from '../../../model/Category';
import { History } from '../../../model/History';
import { Question } from '../../../model/Question';
import { Answer } from '../../../model/Answer';
import { LoginDto } from '../../../dto/login.dto';
import { GlobalDto } from '../../../dto/global.dto';
export declare class WriterService {
    private readonly _writerRepository;
    private readonly _categoryRepository;
    private readonly _historyRepository;
    private readonly _questionRepository;
    private readonly _answerRepository;
    constructor(_writerRepository: Repository<Writer>, _categoryRepository: Repository<Category>, _historyRepository: Repository<History>, _questionRepository: Repository<Question>, _answerRepository: Repository<Answer>);
    login(request: LoginDto): Promise<LoginResponseDto>;
    writerRegister(writer: Writer): Promise<LoginResponseDto>;
    getWriterById(id: number): Promise<Writer>;
    listWriter(): Promise<Writer[]>;
    categoryRegister(category: Category): Promise<Category>;
    getCategoryById(id: number): Promise<Category>;
    listCategory(): Promise<Category[]>;
    historyRegister(history: History): Promise<History>;
    getHistoryById(id: number): Promise<History>;
    listHistoryByUserId(userId: number): Promise<History[]>;
    historyContainQuestion(id: number): Promise<Question[]>;
    answerContainCorrect(id: number): Promise<Answer[]>;
    questionRegister(question: Question): Promise<Question>;
    quizRegister(question: Question): Promise<GlobalDto>;
    getQuestionById(id: number): Promise<Question>;
    listQuestionsByHistoryId(historyId: number): Promise<Question[]>;
    answerRegister(answer: Answer): Promise<Answer>;
    listAnswersByQuestionId(questionId: number): Promise<Answer[]>;
}