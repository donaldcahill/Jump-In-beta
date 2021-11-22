import { GlobalDto } from './../../../dto/global.dto';
import { LoginResponseDto } from './../../../dto/login-response.dto';
import { LoginDto } from './../../../dto/login.dto';
import { WriterService } from '../services/writer.service';
import { Writer } from '../../../model/Writer';
import { Category } from '../../../model/Category';
import { History } from '../../../model/History';
import { Question } from '../../../model/Question';
import { Answer } from '../../../model/Answer';
export declare class WriterController {
    private writerService;
    constructor(writerService: WriterService);
    login(writer: LoginDto): Promise<LoginResponseDto>;
    getAllWriters(): Promise<Writer[]>;
    createWriter(writer: Writer): Promise<LoginResponseDto>;
    getWriterById(id: number): Promise<Writer>;
    createCategory(category: Category): Promise<Category>;
    getAllCategories(): Promise<Category[]>;
    getCategoryById(id: number): Promise<Category>;
    createHistory(history: History): Promise<History>;
    getHistoryById(id: number): Promise<History>;
    listHistoryByUserId(id: number): Promise<History[]>;
    createQuestion(question: Question): Promise<Question>;
    quizRegister(question: Question): Promise<GlobalDto>;
    getQuestionById(id: number): Promise<Question>;
    listQuestionByHistoryId(id: number): Promise<Question[]>;
    createAnswer(answer: Answer): Promise<Answer>;
    listAnswersByQuestionId(id: number): Promise<Answer[]>;
    listHistoryByQuestionId(id: number): Promise<Question[]>;
    listAnswerByQuestionId(id: number): Promise<Answer[]>;
}