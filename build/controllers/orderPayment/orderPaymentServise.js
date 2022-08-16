var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { Body, Controller, Get, Path, Post, Put, Route, Tags } from "tsoa";
let OrderPaymentController = class OrderPaymentController extends Controller {
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
    Get()
], OrderPaymentController.prototype, "getAllPayment", null);
__decorate([
    Get("/{orderPaymentId}"),
    __param(0, Path())
], OrderPaymentController.prototype, "getOrderPayment", null);
__decorate([
    Post(),
    __param(0, Body())
], OrderPaymentController.prototype, "createOrderPayment", null);
__decorate([
    Put("/{orderPaymentId}"),
    __param(0, Path()),
    __param(1, Body())
], OrderPaymentController.prototype, "updateOrderPayment", null);
OrderPaymentController = __decorate([
    Tags("orderPayment"),
    Route("/orderPayment")
], OrderPaymentController);
export { OrderPaymentController };
//# sourceMappingURL=orderPaymentServise.js.map