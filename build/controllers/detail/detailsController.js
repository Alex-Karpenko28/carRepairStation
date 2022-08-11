var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { Body, Controller, Get, Path, Post, Route, Tags } from "tsoa";
let UsersController = class UsersController extends Controller {
    async getAllDetails() {
        return null;
    }
    async getDetail(detailId) {
        return null;
    }
    async login(body) {
        return null;
    }
    async updateOrder(body) {
        return null;
    }
};
__decorate([
    Get()
], UsersController.prototype, "getAllDetails", null);
__decorate([
    Get("/{detailId}"),
    __param(0, Path())
], UsersController.prototype, "getDetail", null);
__decorate([
    Post(),
    __param(0, Body())
], UsersController.prototype, "login", null);
__decorate([
    Put("/{detailId}"),
    __param(0, Body())
], UsersController.prototype, "updateOrder", null);
UsersController = __decorate([
    Tags("detail"),
    Route("/details")
], UsersController);
export { UsersController };
//# sourceMappingURL=detailsController.js.map