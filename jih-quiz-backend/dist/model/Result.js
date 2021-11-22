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
exports.Result = void 0;
const typeorm_1 = require("typeorm");
const History_1 = require("./History");
const User_1 = require("./User");
let Result = class Result {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: "bigint", name: "id_result" }),
    __metadata("design:type", String)
], Result.prototype, "idResult", void 0);
__decorate([
    (0, typeorm_1.Column)("bigint", { name: "id_user" }),
    __metadata("design:type", String)
], Result.prototype, "idUser", void 0);
__decorate([
    (0, typeorm_1.Column)("bigint", { name: "id_history" }),
    __metadata("design:type", String)
], Result.prototype, "idHistory", void 0);
__decorate([
    (0, typeorm_1.Column)("decimal", { name: "points", precision: 65, scale: 2 }),
    __metadata("design:type", String)
], Result.prototype, "points", void 0);
__decorate([
    (0, typeorm_1.Column)("timestamp", {
        name: "date_register",
        default: () => "CURRENT_TIMESTAMP",
    }),
    __metadata("design:type", Date)
], Result.prototype, "dateRegister", void 0);
__decorate([
    (0, typeorm_1.Column)("tinyint", { name: "state" }),
    __metadata("design:type", Number)
], Result.prototype, "state", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => History_1.History, (history) => history.results, {
        onDelete: "NO ACTION",
        onUpdate: "NO ACTION",
    }),
    (0, typeorm_1.JoinColumn)([{ name: "id_history", referencedColumnName: "idHistory" }]),
    __metadata("design:type", History_1.History)
], Result.prototype, "idHistory2", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_1.User, (user) => user.results, {
        onDelete: "NO ACTION",
        onUpdate: "NO ACTION",
    }),
    (0, typeorm_1.JoinColumn)([{ name: "id_user", referencedColumnName: "idUser" }]),
    __metadata("design:type", User_1.User)
], Result.prototype, "idUser2", void 0);
Result = __decorate([
    (0, typeorm_1.Index)("IXFK_result_history", ["idHistory"], {}),
    (0, typeorm_1.Index)("IXFK_result_usuario", ["idUser"], {}),
    (0, typeorm_1.Entity)("result", { schema: "quiz" })
], Result);
exports.Result = Result;
//# sourceMappingURL=Result.js.map