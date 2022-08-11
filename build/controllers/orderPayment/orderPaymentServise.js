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
let UsersController = class UsersController extends Controller {
    async getAllPayment() {
        return null;
    }
    async getOrder(orderPaymentId) {
        return null;
    }
    async createOrderPayment(body) {
        return null;
    }
    async updateOrder(body) {
        return null;
    }
};
__decorate([
    Get()
], UsersController.prototype, "getAllPayment", null);
__decorate([
    Get("/{orderPaymentId}"),
    __param(0, Path())
], UsersController.prototype, "getOrder", null);
__decorate([
    Post(),
    __param(0, Body())
], UsersController.prototype, "createOrderPayment", null);
__decorate([
    Put("/{orderPaymentId}"),
    __param(0, Body())
], UsersController.prototype, "updateOrder", null);
UsersController = __decorate([
    Tags("orderPayment"),
    Route("/orderPayment")
], UsersController);
export { UsersController };
//# sourceMappingURL=orderPaymentServise.js.map