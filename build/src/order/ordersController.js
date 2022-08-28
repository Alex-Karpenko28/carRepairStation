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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrdersController = void 0;
const tsoa_1 = require("tsoa");
const orderServise_1 = require("./orderServise");
let OrdersController = class OrdersController extends tsoa_1.Controller {
    async getAllOrders() {
        return await new orderServise_1.OrderService().getAllOrders();
    }
    async getOrder(orderId) {
        return await new orderServise_1.OrderService().getConcreteOrder(orderId);
    }
    async createOrder(body) {
        return new orderServise_1.OrderService().createOrder(body);
    }
    async updateOrder(orderId, body) {
        return new orderServise_1.OrderService().updateConreteOrder(body, orderId);
    }
    async deleteOrder(orderId) {
        new orderServise_1.OrderService().deleteConcreteOrder(orderId);
    }
};
__decorate([
    (0, tsoa_1.Get)(),
    (0, tsoa_1.Security)('barearAuth', ['admin', 'worker']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], OrdersController.prototype, "getAllOrders", null);
__decorate([
    (0, tsoa_1.Get)('/{orderId}'),
    (0, tsoa_1.Security)('barearAuth', ['admin', 'worker', 'client']),
    __param(0, (0, tsoa_1.Path)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], OrdersController.prototype, "getOrder", null);
__decorate([
    (0, tsoa_1.Post)(),
    (0, tsoa_1.Security)('barearAuth', ['admin']),
    __param(0, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], OrdersController.prototype, "createOrder", null);
__decorate([
    (0, tsoa_1.Put)('/{orderId}'),
    (0, tsoa_1.Security)('barearAuth', ['admin', 'worker']),
    __param(0, (0, tsoa_1.Path)()),
    __param(1, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], OrdersController.prototype, "updateOrder", null);
__decorate([
    (0, tsoa_1.Delete)('/{orderId}'),
    (0, tsoa_1.Security)('barearAuth', ['admin']),
    __param(0, (0, tsoa_1.Path)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], OrdersController.prototype, "deleteOrder", null);
OrdersController = __decorate([
    (0, tsoa_1.Tags)('order'),
    (0, tsoa_1.Route)('/orders')
], OrdersController);
exports.OrdersController = OrdersController;
//# sourceMappingURL=ordersController.js.map