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
exports.User = void 0;
const typeorm_1 = require("typeorm");
const Points_1 = require("./Points");
const Result_1 = require("./Result");
let User = class User {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: "bigint", name: "id_user" }),
    __metadata("design:type", String)
], User.prototype, "idUser", void 0);
__decorate([
    (0, typeorm_1.Column)("text", { name: "first_name" }),
    __metadata("design:type", String)
], User.prototype, "firstName", void 0);
__decorate([
    (0, typeorm_1.Column)("text", { name: "last_name" }),
    __metadata("design:type", String)
], User.prototype, "lastName", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { name: "email", unique: true, length: 350 }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)("text", { name: "password" }),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)("timestamp", {
        name: "date_register",
        default: () => "CURRENT_TIMESTAMP",
    }),
    __metadata("design:type", Date)
], User.prototype, "dateRegister", void 0);
__decorate([
    (0, typeorm_1.Column)("tinyint", { name: "state" }),
    __metadata("design:type", Number)
], User.prototype, "state", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Points_1.Points, (points) => points.idUser2),
    __metadata("design:type", Array)
], User.prototype, "points", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Result_1.Result, (result) => result.idUser2),
    __metadata("design:type", Array)
], User.prototype, "results", void 0);
User = __decorate([
    (0, typeorm_1.Index)("UK_email_user", ["email"], { unique: true }),
    (0, typeorm_1.Entity)("user", { schema: "quiz" })
], User);
exports.User = User;
//# sourceMappingURL=User.js.map