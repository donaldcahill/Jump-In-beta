import { History } from './../../../model/History';
import { QuizService } from '../services/quiz.service';
import { User } from '../../../model/User';
import { Result } from '../../../model/Result';
import { Points } from '../../../model/Points';
import { Category } from '../../../model/Category';
import { Question } from '../../../model/Question';
export declare class QuizController {
    private quizService;
    constructor(quizService: QuizService);
    generateUser(): Promise<User>;
    listHistoryByCategory(id: number): Promise<History[]>;
    generateQuestion(idHistory: number): Promise<Question[]>;
    createUser(user: User): Promise<User>;
    registerResult(result: Result): Promise<Result>;
    registerPoints(points: Points): Promise<Points>;
    listCategory(): Promise<Category[]>;
    generateHistoryByCategoryId(categoryId: number): Promise<History>;
    listHistoryByCategoryId(id: number): Promise<History[]>;
    getPointsByUserId(userId: number): Promise<number>;
    getResultByUserId(userId: number): Promise<number>;
    loginUser(data: {
        email: string;
        password: string;
    }): Promise<User>;
    getUserById(userId: number): Promise<User>;
}
