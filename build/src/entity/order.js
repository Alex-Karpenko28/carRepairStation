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
exports.Order = exports.OrderStatus = void 0;
const typeorm_1 = require("typeorm");
const detail_1 = require("./detail");
const user_1 = require("./user");
var OrderStatus;
(function (OrderStatus) {
    OrderStatus["DIAGNOSTIC"] = "diagnostic";
    OrderStatus["OrderingSpareParts"] = "ordering spare parts";
    OrderStatus["REPAIR"] = "repair";
    OrderStatus["READY"] = "ready";
})(OrderStatus = exports.OrderStatus || (exports.OrderStatus = {}));
let Order = class Order {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Order.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "enum",
        enum: OrderStatus,
        default: OrderStatus.DIAGNOSTIC,
    }),
    __metadata("design:type", String)
], Order.prototype, "orderStatus", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Order.prototype, "orderDescription", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Order.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Order.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => detail_1.Detail, (detail) => detail.order),
    __metadata("design:type", Array)
], Order.prototype, "details", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_1.User, (worker) => worker.id),
    __metadata("design:type", user_1.User)
], Order.prototype, "worker", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_1.User, (client) => client.id),
    __metadata("design:type", user_1.User)
], Order.prototype, "client", void 0);
Order = __decorate([
    (0, typeorm_1.Entity)("order")
], Order);
exports.Order = Order;
//# sourceMappingURL=order.js.map