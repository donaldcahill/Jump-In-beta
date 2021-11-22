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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Answer = void 0;
const typeorm_1 = require("typeorm");
const Question_1 = require("./Question");
let Answer = class Answer {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: "bigint", name: "id_answer" }),
    __metadata("design:type", String)
], Answer.prototype, "idAnswer", void 0);
__decorate([
    (0, typeorm_1.Column)("bigint", { name: "id_question" }),
    __metadata("design:type", String)
], Answer.prototype, "idQuestion", void 0);
__decorate([
    (0, typeorm_1.Column)("text", { name: "response" }),
    __metadata("design:type", String)
], Answer.prototype, "response", void 0);
__decorate([
    (0, typeorm_1.Column)("tinyint", { name: "correct" }),
    __metadata("design:type", Number)
], Answer.prototype, "correct", void 0);
__decorate([
    (0, typeorm_1.Column)("timestamp", {
        name: "date_register",
        default: () => "CURRENT_TIMESTAMP",
    }),
    __metadata("design:type", Date)
], Answer.prototype, "dateRegister", void 0);
__decorate([
    (0, typeorm_1.Column)("tinyint", { name: "state" }),
    __metadata("design:type", Number)
], Answer.prototype, "state", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Question_1.Question, (question) => question.answers, {
        onDelete: "NO ACTION",
        onUpdate: "NO ACTION",
    }),
    (0, typeorm_1.JoinColumn)([{ name: "id_question", referencedColumnName: "idQuestion" }]),
    __metadata("design:type", Question_1.Question)
], Answer.prototype, "idQuestion2", void 0);
Answer = __decorate([
    (0, typeorm_1.Index)("IXFK_answer_question", ["idQuestion"], {}),
    (0, typeorm_1.Entity)("answer", { schema: "quiz" })
], Answer);
exports.Answer = Answer;
//# sourceMappingURL=Answer.js.map