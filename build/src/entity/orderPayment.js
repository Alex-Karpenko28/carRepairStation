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
exports.OrderPayment = void 0;
const typeorm_1 = require("typeorm");
const order_1 = require("./order");
const user_1 = require("./user");
let OrderPayment = class OrderPayment {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], OrderPayment.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'numeric', precision: 10, scale: 3 }),
    __metadata("design:type", Number)
], OrderPayment.prototype, "detailPriceSum", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'numeric', precision: 10, scale: 3 }),
    __metadata("design:type", Number)
], OrderPayment.prototype, "workPrice", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], OrderPayment.prototype, "paymentConformation", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], OrderPayment.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], OrderPayment.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => order_1.Order, {
        onDelete: 'CASCADE',
        orphanedRowAction: 'delete',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'orderId' }),
    __metadata("design:type", Number)
], OrderPayment.prototype, "orderId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_1.User, (client) => client.id, {
        onDelete: 'CASCADE',
        orphanedRowAction: 'delete',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'clientId' }),
    __metadata("design:type", Number)
], OrderPayment.prototype, "clientId", void 0);
OrderPayment = __decorate([
    (0, typeorm_1.Entity)('orderPayment')
], OrderPayment);
exports.OrderPayment = OrderPayment;
//# sourceMappingURL=orderPayment.js.map