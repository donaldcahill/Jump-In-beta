"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuizService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const Writer_1 = require("../../../model/Writer");
const typeorm_2 = require("typeorm");
const Category_1 = require("../../../model/Category");
const History_1 = require("../../../model/History");
const Question_1 = require("../../../model/Question");
const Answer_1 = require("../../../model/Answer");
const User_1 = require("../../../model/User");
const Points_1 = require("../../../model/Points");
const Result_1 = require("../../../model/Result");
let QuizService = class QuizService {
    constructor(_writerRepository, _categoryRepository, _historyRepository, _questionRepository, _answerRepository, _userRepository, _pointsRepository, _resultRepository) {
        this._writerRepository = _writerRepository;
        this._categoryRepository = _categoryRepository;
        this._historyRepository = _historyRepository;
        this._questionRepository = _questionRepository;
        this._answerRepository = _answerRepository;
        this._userRepository = _userRepository;
        this._pointsRepository = _pointsRepository;
        this._resultRepository = _resultRepository;
    }
    async generateUser() {
        const user = new User_1.User();
        user.firstName = this.generateRandomString(10);
        user.lastName = this.generateRandomString(10);
        user.dateRegister = new Date();
        user.state = 1;
        user.email = Math.random().toString(36).substring(2, 15) + '@quiz.com';
        user.password = Math.random().toString(36).substring(2, 15);
        return await this._userRepository.save(user);
    }
    generateRandomString(length) {
        let text = '';
        const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < length; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return text;
    }
    async generateListUsers() {
        return await this._userRepository.find({
            relations: ['writer', 'category', 'history', 'question', 'answer', 'points', 'result'],
        });
    }
    async listHistoryByCategory(categoryId) {
        const histories = await this._historyRepository.find({
            where: { categoryId: categoryId },
        });
        return histories;
    }
    async generateQuestion(historyId) {
        const questions = await this._questionRepository.find({
            where: { idHistory: historyId, state: 1 },
            relations: ['answers'],
        });
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
    async generateRandomQuestion(historyId) {
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
    async createUser(user) {
        return await this._userRepository.save(user);
    }
    async registerResult(result) {
        return await this._resultRepository.save(result);
    }
    async registerPoints(points) {
        return await this._pointsRepository.save(points);
    }
    async listCategory() {
        return await this._categoryRepository.find({ state: 1 });
    }
    async listHistoryByCategoryId(categoryId) {
        return await this._historyRepository.find({
            where: { idCategory: categoryId },
        });
    }
    async generateHistoryByCategoryId(categoryId) {
        const histories = await this._historyRepository.find({
            where: { idCategory: categoryId, state: 1 },
        });
        console.log(categoryId);
        console.log(histories.length);
        const random = Math.floor(Math.random() * histories.length);
        console.log(random);
        return histories[random];
    }
    async getPointsByUserId(userId) {
        return await this._pointsRepository.count({ idUser: userId + '' });
    }
    async getResultByUserId(userId) {
        return await this._resultRepository.count({ idUser: userId + '' });
    }
    async loginUser(email, password) {
        return await this._userRepository.findOne({
            where: { email: email, password: password },
        });
    }
    async getUserById(userId) {
        return await this._userRepository.findOne({
            where: { id: userId },
        });
    }
};
QuizService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(Writer_1.Writer)),
    __param(1, (0, typeorm_1.InjectRepository)(Category_1.Category)),
    __param(2, (0, typeorm_1.InjectRepository)(History_1.History)),
    __param(3, (0, typeorm_1.InjectRepository)(Question_1.Question)),
    __param(4, (0, typeorm_1.InjectRepository)(Answer_1.Answer)),
    __param(5, (0, typeorm_1.InjectRepository)(User_1.User)),
    __param(6, (0, typeorm_1.InjectRepository)(Points_1.Points)),
    __param(7, (0, typeorm_1.InjectRepository)(Result_1.Result)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], QuizService);
exports.QuizService = QuizService;
//# sourceMappingURL=quiz.service.js.map