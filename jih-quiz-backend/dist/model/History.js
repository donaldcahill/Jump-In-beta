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
exports.History = void 0;
const typeorm_1 = require("typeorm");
const Category_1 = require("./Category");
const Writer_1 = require("./Writer");
const Question_1 = require("./Question");
const Result_1 = require("./Result");
let History = class History {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: "bigint", name: "id_history" }),
    __metadata("design:type", String)
], History.prototype, "idHistory", void 0);
__decorate([
    (0, typeorm_1.Column)("bigint", { name: "id_category" }),
    __metadata("design:type", String)
], History.prototype, "idCategory", void 0);
__decorate([
    (0, typeorm_1.Column)("bigint", { name: "id_writer" }),
    __metadata("design:type", String)
], History.prototype, "idWriter", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { name: "title", length: 250 }),
    __metadata("design:type", String)
], History.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)("text", { name: "content" }),
    __metadata("design:type", String)
], History.prototype, "content", void 0);
__decorate([
    (0, typeorm_1.Column)("text", { name: "url", nullable: true }),
    __metadata("design:type", String)
], History.prototype, "url", void 0);
__decorate([
    (0, typeorm_1.Column)("timestamp", {
        name: "date_register",
        default: () => "CURRENT_TIMESTAMP",
    }),
    __metadata("design:type", Date)
], History.prototype, "dateRegister", void 0);
__decorate([
    (0, typeorm_1.Column)("tinyint", { name: "state" }),
    __metadata("design:type", Number)
], History.prototype, "state", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Category_1.Category, (category) => category.histories, {
        onDelete: "NO ACTION",
        onUpdate: "NO ACTION",
    }),
    (0, typeorm_1.JoinColumn)([{ name: "id_category", referencedColumnName: "idCategory" }]),
    __metadata("design:type", Category_1.Category)
], History.prototype, "idCategory2", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Writer_1.Writer, (writer) => writer.histories, {
        onDelete: "NO ACTION",
        onUpdate: "NO ACTION",
    }),
    (0, typeorm_1.JoinColumn)([{ name: "id_writer", referencedColumnName: "idWriter" }]),
    __metadata("design:type", Writer_1.Writer)
], History.prototype, "idWriter2", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Question_1.Question, (question) => question.idHistory2),
    __metadata("design:type", Array)
], History.prototype, "questions", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Result_1.Result, (result) => result.idHistory2),
    __metadata("design:type", Array)
], History.prototype, "results", void 0);
History = __decorate([
    (0, typeorm_1.Index)("IXFK_history_category", ["idCategory"], {}),
    (0, typeorm_1.Index)("IXFK_history_writer", ["idWriter"], {}),
    (0, typeorm_1.Entity)("history", { schema: "quiz" })
], History);
exports.History = History;
//# sourceMappingURL=History.js.map