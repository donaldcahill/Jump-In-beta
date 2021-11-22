"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WriterModule = void 0;
const User_1 = require("./../../model/User");
const common_1 = require("@nestjs/common");
const writer_service_1 = require("./services/writer.service");
const writer_controller_1 = require("./controllers/writer.controller");
const typeorm_1 = require("@nestjs/typeorm");
const Answer_1 = require("../../model/Answer");
const Category_1 = require("../../model/Category");
const Question_1 = require("../../model/Question");
const Result_1 = require("../../model/Result");
const Writer_1 = require("../../model/Writer");
const History_1 = require("../../model/History");
const Points_1 = require("../../model/Points");
let WriterModule = class WriterModule {
};
WriterModule = __decorate([
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
        providers: [writer_service_1.WriterService],
        controllers: [writer_controller_1.WriterController]
    })
], WriterModule);
exports.WriterModule = WriterModule;
//# sourceMappingURL=writer.module.js.map