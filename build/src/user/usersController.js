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
exports.UsersController = void 0;
const tsoa_1 = require("tsoa");
const usersService_1 = require("./usersService");
let UsersController = class UsersController extends tsoa_1.Controller {
    async getAllUser() {
        return new usersService_1.UsersService().getAllUsers();
    }
    async getUser(userId) {
        return new usersService_1.UsersService().get(userId);
    }
    async getMyUser(request) {
        return new usersService_1.UsersService().get(request.context.userId);
    }
    async login(body) {
        return new usersService_1.UsersService().post(body);
    }
    async signUpByLink(link) {
        return null;
    }
    async createUser(body) {
        return new usersService_1.UsersService().createNewUser(body);
    }
    async logOut(authorization) {
        //return null
    }
};
__decorate([
    (0, tsoa_1.Get)(),
    (0, tsoa_1.Security)("barearAuth", ["admin", "worker"]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getAllUser", null);
__decorate([
    (0, tsoa_1.Get)("/{userId}"),
    (0, tsoa_1.Security)("barearAuth", ["admin", "worker"]),
    __param(0, (0, tsoa_1.Path)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getUser", null);
__decorate([
    (0, tsoa_1.Get)("/get/me"),
    (0, tsoa_1.Security)("barearAuth", ["admin", "worker"]),
    __param(0, (0, tsoa_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getMyUser", null);
__decorate([
    (0, tsoa_1.Post)("/login"),
    __param(0, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "login", null);
__decorate([
    (0, tsoa_1.Get)("/signup-by-link/{link}"),
    __param(0, (0, tsoa_1.Path)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "signUpByLink", null);
__decorate([
    (0, tsoa_1.Post)(),
    (0, tsoa_1.Security)("barearAuth", ["admin"]),
    __param(0, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "createUser", null);
__decorate([
    (0, tsoa_1.Post)("/logout"),
    __param(0, (0, tsoa_1.Header)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "logOut", null);
UsersController = __decorate([
    (0, tsoa_1.Tags)("user"),
    (0, tsoa_1.Route)("/users")
], UsersController);
exports.UsersController = UsersController;
//# sourceMappingURL=usersController.js.map