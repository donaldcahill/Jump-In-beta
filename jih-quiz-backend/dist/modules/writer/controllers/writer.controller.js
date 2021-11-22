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
exports.WriterController = void 0;
const common_1 = require("@nestjs/common");
const writer_service_1 = require("../services/writer.service");
const Writer_1 = require("../../../model/Writer");
const Category_1 = require("../../../model/Category");
const History_1 = require("../../../model/History");
const Question_1 = require("../../../model/Question");
const Answer_1 = require("../../../model/Answer");
let WriterController = class WriterController {
    constructor(writerService) {
        this.writerService = writerService;
    }
    async login(writer) {
        return await this.writerService.login(writer);
    }
    async getAllWriters() {
        return await this.writerService.listWriter();
    }
    async createWriter(writer) {
        return await this.writerService.writerRegister(writer);
    }
    async getWriterById(id) {
        return await this.writerService.getWriterById(id);
    }
    async createCategory(category) {
        return await this.writerService.categoryRegister(category);
    }
    async getAllCategories() {
        return await this.writerService.listCategory();
    }
    async getCategoryById(id) {
        return await this.writerService.getCategoryById(id);
    }
    async createHistory(history) {
        return await this.writerService.historyRegister(history);
    }
    async getHistoryById(id) {
        return await this.writerService.getHistoryById(id);
    }
    async listHistoryByUserId(id) {
        return await this.writerService.listHistoryByUserId(id);
    }
    async createQuestion(question) {
        return await this.writerService.questionRegister(question);
    }
    async quizRegister(question) {
        return await this.writerService.quizRegister(question);
    }
    async getQuestionById(id) {
        return await this.writerService.getQuestionById(id);
    }
    async listQuestionByHistoryId(id) {
        return await this.writerService.listQuestionsByHistoryId(id);
    }
    async createAnswer(answer) {
        return await this.writerService.answerRegister(answer);
    }
    async listAnswersByQuestionId(id) {
        return await this.writerService.listAnswersByQuestionId(id);
    }
    async listHistoryByQuestionId(id) {
        return await this.writerService.historyContainQuestion(id);
    }
    async listAnswerByQuestionId(id) {
        return await this.writerService.answerContainCorrect(id);
    }
};
__decorate([
    (0, common_1.Post)('writer/login'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], WriterController.prototype, "login", null);
__decorate([
    (0, common_1.Get)('writer/list'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], WriterController.prototype, "getAllWriters", null);
__decorate([
    (0, common_1.Post)('writer/create'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Writer_1.Writer]),
    __metadata("design:returntype", Promise)
], WriterController.prototype, "createWriter", null);
__decorate([
    (0, common_1.Get)('writer/get/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], WriterController.prototype, "getWriterById", null);
__decorate([
    (0, common_1.Post)('category/create'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Category_1.Category]),
    __metadata("design:returntype", Promise)
], WriterController.prototype, "createCategory", null);
__decorate([
    (0, common_1.Get)('category/list'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], WriterController.prototype, "getAllCategories", null);
__decorate([
    (0, common_1.Get)('category/get/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], WriterController.prototype, "getCategoryById", null);
__decorate([
    (0, common_1.Post)('history/create'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [History_1.History]),
    __metadata("design:returntype", Promise)
], WriterController.prototype, "createHistory", null);
__decorate([
    (0, common_1.Get)('history/get/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], WriterController.prototype, "getHistoryById", null);
__decorate([
    (0, common_1.Get)('history/user/get/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], WriterController.prototype, "listHistoryByUserId", null);
__decorate([
    (0, common_1.Post)('question/create'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Question_1.Question]),
    __metadata("design:returntype", Promise)
], WriterController.prototype, "createQuestion", null);
__decorate([
    (0, common_1.Post)('question/create-quiz'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Question_1.Question]),
    __metadata("design:returntype", Promise)
], WriterController.prototype, "quizRegister", null);
__decorate([
    (0, common_1.Get)('question/get/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], WriterController.prototype, "getQuestionById", null);
__decorate([
    (0, common_1.Get)('question/history/get/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], WriterController.prototype, "listQuestionByHistoryId", null);
__decorate([
    (0, common_1.Post)('answer/create'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Answer_1.Answer]),
    __metadata("design:returntype", Promise)
], WriterController.prototype, "createAnswer", null);
__decorate([
    (0, common_1.Get)('answer/get/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], WriterController.prototype, "listAnswersByQuestionId", null);
__decorate([
    (0, common_1.Get)('hystory/contain/question/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], WriterController.prototype, "listHistoryByQuestionId", null);
__decorate([
    (0, common_1.Get)('answer/contain/correct/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], WriterController.prototype, "listAnswerByQuestionId", null);
WriterController = __decorate([
    (0, common_1.Controller)('writers'),
    __metadata("design:paramtypes", [writer_service_1.WriterService])
], WriterController);
exports.WriterController = WriterController;
//# sourceMappingURL=writer.controller.js.map