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
exports.DetailsController = void 0;
const tsoa_1 = require("tsoa");
let DetailsController = class DetailsController extends tsoa_1.Controller {
    async getAllDetails() {
        return null;
    }
    async getDetail(detailId) {
        return null;
    }
    async createDetail(body) {
        return null;
    }
    async updateDetail(detailId, body) {
        return null;
    }
    async deleteDetail(detailId) {
        //return null;
    }
};
__decorate([
    (0, tsoa_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DetailsController.prototype, "getAllDetails", null);
__decorate([
    (0, tsoa_1.Get)("/{detailId}"),
    __param(0, (0, tsoa_1.Path)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], DetailsController.prototype, "getDetail", null);
__decorate([
    (0, tsoa_1.Post)(),
    __param(0, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], DetailsController.prototype, "createDetail", null);
__decorate([
    (0, tsoa_1.Put)("/{detailId}"),
    __param(0, (0, tsoa_1.Path)()),
    __param(1, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], DetailsController.prototype, "updateDetail", null);
__decorate([
    (0, tsoa_1.Delete)("/{detailId}"),
    __param(0, (0, tsoa_1.Path)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], DetailsController.prototype, "deleteDetail", null);
DetailsController = __decorate([
    (0, tsoa_1.Tags)("detail"),
    (0, tsoa_1.Route)("/details")
], DetailsController);
exports.DetailsController = DetailsController;
//# sourceMappingURL=detailsController.js.map