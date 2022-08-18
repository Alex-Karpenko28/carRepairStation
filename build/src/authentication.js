"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.expressAuthentication = void 0;
const jwt = __importStar(require("jsonwebtoken"));
require("dotenv/config");
const verifyJWT = async (token) => new Promise((resolve, reject) => {
    jwt.verify(token, process.env.SECRET_KEY, (err, data) => {
        if (err) {
            return reject(err);
        }
        return resolve(data);
    });
});
async function expressAuthentication(request, securityName, roles // admin worker client
) {
    if (securityName !== "barearAuth")
        return undefined;
    const authorization = request.headers.authorization;
    if (!authorization) {
        throw new Error("Not Authorized");
    }
    const payload = await verifyJWT(authorization);
    const role = payload.role;
    if (!roles.includes(role)) {
        throw new Error("Forbidden! User is not authorized");
    }
    request.context = { userId: payload.id };
}
exports.expressAuthentication = expressAuthentication;
//# sourceMappingURL=authentication.js.map