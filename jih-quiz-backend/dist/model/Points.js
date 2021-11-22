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
exports.Points = void 0;
const typeorm_1 = require("typeorm");
const User_1 = require("./User");
let Points = class Points {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: "bigint", name: "id_points" }),
    __metadata("design:type", String)
], Points.prototype, "idPoints", void 0);
__decorate([
    (0, typeorm_1.Column)("bigint", { name: "id_user" }),
    __metadata("design:type", String)
], Points.prototype, "idUser", void 0);
__decorate([
    (0, typeorm_1.Column)("decimal", {
        name: "ammount",
        precision: 50,
        scale: 2,
        default: () => "'0.00'",
    }),
    __metadata("design:type", String)
], Points.prototype, "ammount", void 0);
__decorate([
    (0, typeorm_1.Column)("tinyint", { name: "state", nullable: true, width: 1 }),
    __metadata("design:type", Boolean)
], Points.prototype, "state", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_1.User, (user) => user.points, {
        onDelete: "NO ACTION",
        onUpdate: "NO ACTION",
    }),
    (0, typeorm_1.JoinColumn)([{ name: "id_user", referencedColumnName: "idUser" }]),
    __metadata("design:type", User_1.User)
], Points.prototype, "idUser2", void 0);
Points = __decorate([
    (0, typeorm_1.Index)("FK_points_user", ["idUser"], {}),
    (0, typeorm_1.Entity)("points", { schema: "quiz" })
], Points);
exports.Points = Points;
//# sourceMappingURL=Points.js.map