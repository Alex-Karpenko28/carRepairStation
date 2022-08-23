"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiError = void 0;
class ApiError extends Error {
    constructor(name, statusCode, message) {
        super(message);
        this.name = name;
        this.statusCode = statusCode;
        this.message = message;
    }
}
exports.ApiError = ApiError;
//# sourceMappingURL=ApiError.js.map