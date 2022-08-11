var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { Body, Controller, Get, Header, Path, Post, Route, Tags } from "tsoa";
let UsersController = class UsersController extends Controller {
    async getAllUser() {
        return null;
    }
    async getUser(userId) {
        return null;
    }
    async login(body) {
        return null;
    }
    async signUpByLink(link) {
        return null;
    }
    async createUser(body) {
        //return null
    }
    async logOut(authorization) {
        //return null
    }
};
__decorate([
    Get()
], UsersController.prototype, "getAllUser", null);
__decorate([
    Get("/{userId}"),
    __param(0, Path())
], UsersController.prototype, "getUser", null);
__decorate([
    Post("/login"),
    __param(0, Body())
], UsersController.prototype, "login", null);
__decorate([
    Get("/signup-by-link/{link}"),
    __param(0, Path())
], UsersController.prototype, "signUpByLink", null);
__decorate([
    Post(),
    __param(0, Body())
], UsersController.prototype, "createUser", null);
__decorate([
    Post("/logout"),
    __param(0, Header())
], UsersController.prototype, "logOut", null);
UsersController = __decorate([
    Tags("user"),
    Route("/users")
], UsersController);
export { UsersController };
//# sourceMappingURL=usersController.js.map