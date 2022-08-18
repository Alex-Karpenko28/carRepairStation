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
exports.OrderPaymentController = void 0;
const tsoa_1 = require("tsoa");
let OrderPaymentController = class OrderPaymentController extends tsoa_1.Controller {
    async getAllPayment() {
        return null;
    }
    async getOrderPayment(orderPaymentId) {
        return null;
    }
    async createOrderPayment(body) {
        return null;
    }
    async updateOrderPayment(orderPaymentId, body) {
        return null;
    }
};
__decorate([
    (0, tsoa_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], OrderPaymentController.prototype, "getAllPayment", null);
__decorate([
    (0, tsoa_1.Get)("/{orderPaymentId}"),
    __param(0, (0, tsoa_1.Path)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], OrderPaymentController.prototype, "getOrderPayment", null);
__decorate([
    (0, tsoa_1.Post)(),
    __param(0, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], OrderPaymentController.prototype, "createOrderPayment", null);
__decorate([
    (0, tsoa_1.Put)("/{orderPaymentId}"),
    __param(0, (0, tsoa_1.Path)()),
    __param(1, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], OrderPaymentController.prototype, "updateOrderPayment", null);
OrderPaymentController = __decorate([
    (0, tsoa_1.Tags)("orderPayment"),
    (0, tsoa_1.Route)("/orderPayment")
], OrderPaymentController);
exports.OrderPaymentController = OrderPaymentController;
//# sourceMappingURL=ordersPaymentController.js.map