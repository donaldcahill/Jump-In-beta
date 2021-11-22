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
exports.Question = void 0;
const typeorm_1 = require("typeorm");
const Answer_1 = require("./Answer");
const History_1 = require("./History");
let Question = class Question {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: "bigint", name: "id_question" }),
    __metadata("design:type", String)
], Question.prototype, "idQuestion", void 0);
__decorate([
    (0, typeorm_1.Column)("bigint", { name: "id_history" }),
    __metadata("design:type", String)
], Question.prototype, "idHistory", void 0);
__decorate([
    (0, typeorm_1.Column)("text", { name: "question" }),
    __metadata("design:type", String)
], Question.prototype, "question", void 0);
__decorate([
    (0, typeorm_1.Column)("timestamp", {
        name: "date_register",
        default: () => "CURRENT_TIMESTAMP",
    }),
    __metadata("design:type", Date)
], Question.prototype, "dateRegister", void 0);
__decorate([
    (0, typeorm_1.Column)("tinyint", { name: "state" }),
    __metadata("design:type", Number)
], Question.prototype, "state", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Answer_1.Answer, (answer) => answer.idQuestion2),
    __metadata("design:type", Array)
], Question.prototype, "answers", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => History_1.History, (history) => history.questions, {
        onDelete: "NO ACTION",
        onUpdate: "NO ACTION",
    }),
    (0, typeorm_1.JoinColumn)([{ name: "id_history", referencedColumnName: "idHistory" }]),
    __metadata("design:type", History_1.History)
], Question.prototype, "idHistory2", void 0);
Question = __decorate([
    (0, typeorm_1.Index)("IXFK_question_history", ["idHistory"], {}),
    (0, typeorm_1.Entity)("question", { schema: "quiz" })
], Question);
exports.Question = Question;
//# sourceMappingURL=Question.js.map