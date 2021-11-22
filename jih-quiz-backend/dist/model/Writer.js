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
exports.Writer = void 0;
const typeorm_1 = require("typeorm");
const History_1 = require("./History");
let Writer = class Writer {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: "bigint", name: "id_writer" }),
    __metadata("design:type", String)
], Writer.prototype, "idWriter", void 0);
__decorate([
    (0, typeorm_1.Column)("text", { name: "name" }),
    __metadata("design:type", String)
], Writer.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)("text", { name: "last_nabme" }),
    __metadata("design:type", String)
], Writer.prototype, "lastNabme", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { name: "email", unique: true, length: 350 }),
    __metadata("design:type", String)
], Writer.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { name: "password", length: 250 }),
    __metadata("design:type", String)
], Writer.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)("timestamp", {
        name: "date_register",
        default: () => "CURRENT_TIMESTAMP",
    }),
    __metadata("design:type", Date)
], Writer.prototype, "dateRegister", void 0);
__decorate([
    (0, typeorm_1.Column)("tinyint", { name: "state" }),
    __metadata("design:type", Number)
], Writer.prototype, "state", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => History_1.History, (history) => history.idWriter2),
    __metadata("design:type", Array)
], Writer.prototype, "histories", void 0);
Writer = __decorate([
    (0, typeorm_1.Index)("UK_email_writer", ["email"], { unique: true }),
    (0, typeorm_1.Entity)("writer", { schema: "quiz" })
], Writer);
exports.Writer = Writer;
//# sourceMappingURL=Writer.js.map