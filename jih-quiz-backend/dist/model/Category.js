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
exports.Category = void 0;
const typeorm_1 = require("typeorm");
const History_1 = require("./History");
let Category = class Category {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: "bigint", name: "id_category" }),
    __metadata("design:type", String)
], Category.prototype, "idCategory", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { name: "title", length: 250 }),
    __metadata("design:type", String)
], Category.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)("text", { name: "description" }),
    __metadata("design:type", String)
], Category.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)("tinyint", { name: "state" }),
    __metadata("design:type", Number)
], Category.prototype, "state", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => History_1.History, (history) => history.idCategory2),
    __metadata("design:type", Array)
], Category.prototype, "histories", void 0);
Category = __decorate([
    (0, typeorm_1.Entity)("category", { schema: "quiz" })
], Category);
exports.Category = Category;
//# sourceMappingURL=Category.js.map