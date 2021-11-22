"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuizModule = void 0;
const User_1 = require("./../../model/User");
const common_1 = require("@nestjs/common");
const quiz_service_1 = require("./services/quiz.service");
const quiz_controller_1 = require("./controllers/quiz.controller");
const typeorm_1 = require("@nestjs/typeorm");
const Answer_1 = require("../../model/Answer");
const Category_1 = require("../../model/Category");
const History_1 = require("../../model/History");
const Question_1 = require("../../model/Question");
const Result_1 = require("../../model/Result");
const Writer_1 = require("../../model/Writer");
const Points_1 = require("../../model/Points");
let QuizModule = class QuizModule {
};
QuizModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                Answer_1.Answer,
                Category_1.Category,
                History_1.History,
                Question_1.Question,
                Result_1.Result,
                User_1.User,
                Writer_1.Writer,
                Points_1.Points,
            ]),
        ],
        providers: [quiz_service_1.QuizService],
        controllers: [quiz_controller_1.QuizController]
    })
], QuizModule);
exports.QuizModule = QuizModule;
//# sourceMappingURL=quiz.module.js.map