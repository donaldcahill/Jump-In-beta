import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Writer } from '../../../model/Writer';
import { Repository } from 'typeorm';
import { Category } from '../../../model/Category';
import { History } from '../../../model/History';
import { Question } from '../../../model/Question';
import { Answer } from '../../../model/Answer';
import { User } from '../../../model/User';
import { Points } from '../../../model/Points';
import { Result } from '../../../model/Result';

@Injectable()
export class QuizService {
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
        @InjectRepository(User)
        private readonly _userRepository: Repository<User>,
        @InjectRepository(Points)
        private readonly _pointsRepository: Repository<Points>,
        @InjectRepository(Result)
        private readonly _resultRepository: Repository<Result>,
    ) { }

    // Generate randm username and password
    async generateUser(): Promise<User> {
        const user = new User();
        user.firstName = this.generateRandomString(10);
        user.lastName = this.generateRandomString(10);
        user.dateRegister = new Date();
        user.state = 1;
        user.email = Math.random().toString(36).substring(2, 15) + '@quiz.com';
        user.password = Math.random().toString(36).substring(2, 15);
        return await this._userRepository.save(user);
    }
    // create function generateRandomString
    private generateRandomString(length: number): string {
        let text = '';
        const possible =
            'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < length; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return text;
    }
    //generate list users
    async generateListUsers(): Promise<User[]> {
        return await this._userRepository.find({
            relations: ['writer', 'category', 'history', 'question', 'answer', 'points', 'result'],
        });
    }
    //list history by category
    async listHistoryByCategory(categoryId: number): Promise<History[]> {
        const histories = await this._historyRepository.find({
            where: { categoryId: categoryId },
        });
        return histories;
    }

    // generate ten random questions by historyId
    async generateQuestion(historyId: number): Promise<Question[]> {
        const questions = await this._questionRepository.find({
            where: { idHistory: historyId, state: 1 },
            relations: ['answers'],
        });
        /*const randomQuestions = [];
        for (let i = 0; i < 5; i++) {
          let random = Math.floor(Math.random() * questions.length);
          while (randomQuestions.includes(random)) {
            random = Math.floor(Math.random() * questions.length);
          }
          randomQuestions.push(questions[random]);
        }*/
        let i = 5;
        let j = 0;
        const randomQuestions = [];
        while (i--) {
            j = Math.floor(Math.random() * (i + 1));
            randomQuestions.push(questions[j]);
            questions.splice(j, 1);
        }
        return randomQuestions;
    }

    // generate random questions by historyId not repeated numbers
    async generateRandomQuestion(historyId: number): Promise<Question[]> {
        const questions = await this._questionRepository.find({
            where: { idHistory: historyId, state: 1 },
            relations: ['answers'],
        });
        const randomQuestions = [];
        for (let i = 0; i < 5; i++) {
            let random = Math.floor(Math.random() * questions.length);
            while (randomQuestions.includes(random)) {
                random = Math.floor(Math.random() * questions.length);
            }
            randomQuestions.push(questions[random]);
        }
        return randomQuestions;
    }

    //create user
    async createUser(user: User): Promise<User> {
        return await this._userRepository.save(user);
    }
    //register result questions
    async registerResult(result: Result): Promise<Result> {
        return await this._resultRepository.save(result);
    }

    //register points
    async registerPoints(points: Points): Promise<Points> {
        return await this._pointsRepository.save(points);
    }

    //list category
    async listCategory(): Promise<Category[]> {
        return await this._categoryRepository.find({ state: 1 });
    }
    // list history by categoryid
    async listHistoryByCategoryId(categoryId: number): Promise<History[]> {
        return await this._historyRepository.find({
            where: { idCategory: categoryId },
        });
    }
    //generate random history by categoryId
    async generateHistoryByCategoryId(categoryId: number): Promise<History> {
        const histories = await this._historyRepository.find({
            where: { idCategory: categoryId, state: 1 },
        });
        console.log(categoryId);
        console.log(histories.length);
        const random = Math.floor(Math.random() * histories.length);
        console.log(random);

        return histories[random];
    }

    //get points by userid
    async getPointsByUserId(userId: number): Promise<number> {
        /*return await this._pointsRepository.findOne({
                where: { userId: userId },
            });*/
        return await this._pointsRepository.count({ idUser: userId + '' });
    }
    //get result by userId
    async getResultByUserId(userId: number): Promise<number> {
        /*return await this._resultRepository.findOne({
          where: { userId: userId },
        });*/
        return await this._resultRepository.count({ idUser: userId + '' });
    }

    // login user
    async loginUser(email: string, password: string): Promise<User> {
        return await this._userRepository.findOne({
            where: { email: email, password: password },
        });
    }
    // get user by id
    async getUserById(userId: number): Promise<User> {
        return await this._userRepository.findOne({
            where: { id: userId },
        });
    }
}
