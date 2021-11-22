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
exports.QuizController = void 0;
const common_1 = require("@nestjs/common");
const quiz_service_1 = require("../services/quiz.service");
const User_1 = require("../../../model/User");
const Result_1 = require("../../../model/Result");
const Points_1 = require("../../../model/Points");
let QuizController = class QuizController {
    constructor(quizService) {
        this.quizService = quizService;
    }
    async generateUser() {
        return await this.quizService.generateUser();
    }
    async listHistoryByCategory(id) {
        return this.quizService.listHistoryByCategory(id);
    }
    async generateQuestion(idHistory) {
        return await this.quizService.generateQuestion(idHistory);
    }
    async createUser(user) {
        return await this.quizService.createUser(user);
    }
    async registerResult(result) {
        return await this.quizService.registerResult(result);
    }
    async registerPoints(points) {
        return await this.quizService.registerPoints(points);
    }
    async listCategory() {
        return await this.quizService.listCategory();
    }
    async generateHistoryByCategoryId(categoryId) {
        return await this.quizService.generateHistoryByCategoryId(categoryId);
    }
    async listHistoryByCategoryId(id) {
        return await this.quizService.listHistoryByCategoryId(id);
    }
    async getPointsByUserId(userId) {
        return await this.quizService.getPointsByUserId(userId);
    }
    async getResultByUserId(userId) {
        return await this.quizService.getResultByUserId(userId);
    }
    async loginUser(data) {
        return await this.quizService.loginUser(data.email, data.password);
    }
    async getUserById(userId) {
        return await this.quizService.getUserById(userId);
    }
};
__decorate([
    (0, common_1.Post)('generate-random'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], QuizController.prototype, "generateUser", null);
__decorate([
    (0, common_1.Get)('list-by-category/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], QuizController.prototype, "listHistoryByCategory", null);
__decorate([
    (0, common_1.Get)('generate-question/:idHistory'),
    __param(0, (0, common_1.Param)('idHistory')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], QuizController.prototype, "generateQuestion", null);
__decorate([
    (0, common_1.Post)('create-user'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [User_1.User]),
    __metadata("design:returntype", Promise)
], QuizController.prototype, "createUser", null);
__decorate([
    (0, common_1.Post)('register-result'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Result_1.Result]),
    __metadata("design:returntype", Promise)
], QuizController.prototype, "registerResult", null);
__decorate([
    (0, common_1.Post)('register-points'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Points_1.Points]),
    __metadata("design:returntype", Promise)
], QuizController.prototype, "registerPoints", null);
__decorate([
    (0, common_1.Get)('list-category'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], QuizController.prototype, "listCategory", null);
__decorate([
    (0, common_1.Get)('get-history-by-category/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], QuizController.prototype, "generateHistoryByCategoryId", null);
__decorate([
    (0, common_1.Get)('list-history-by-category/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], QuizController.prototype, "listHistoryByCategoryId", null);
__decorate([
    (0, common_1.Get)('get-poinst-by-user/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], QuizController.prototype, "getPointsByUserId", null);
__decorate([
    (0, common_1.Get)('get-result-by-user/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], QuizController.prototype, "getResultByUserId", null);
__decorate([
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], QuizController.prototype, "loginUser", null);
__decorate([
    (0, common_1.Get)('get-user/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], QuizController.prototype, "getUserById", null);
QuizController = __decorate([
    (0, common_1.Controller)('quiz'),
    __metadata("design:paramtypes", [quiz_service_1.QuizService])
], QuizController);
exports.QuizController = QuizController;
//# sourceMappingURL=quiz.controller.js.map