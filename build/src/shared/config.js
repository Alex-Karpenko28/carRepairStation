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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = __importStar(require("dotenv"));
const convict_1 = __importDefault(require("convict"));
dotenv.config();
const schema = {
    port: {
        format: Number,
        default: 3000,
        env: "PORT",
    },
    db: {
        name: {
            format: String,
            default: "carRepearStation",
            env: 'DB_NAME'
        },
        user: {
            format: String,
            default: "postgres",
            env: 'DB_USER'
        },
        password: {
            format: String,
            default: "root",
            env: 'DB_PASSWORD'
        },
        host: {
            format: String,
            default: "localhost",
            env: "DB_HOST",
        },
        port: {
            format: Number,
            default: 5432,
            env: "DB_PORT",
        }
    },
    token: {
        secretKey: {
            format: String,
            default: "secret KEY",
            env: "SECRET_KEY",
        },
        life: {
            format: String,
            default: "12h",
            env: "TOKEN_LIFE",
        }
    },
    saltRounds: {
        format: Number,
        default: 10,
        env: "SALT_ROUNDS",
    },
    smtp: {
        host: {
            format: String,
            default: 'smtp.ukr.net',
            env: "SMTP_HOST",
        },
        port: {
            format: Number,
            default: 465,
            env: "SMTP_PORT",
        },
        user: {
            format: String,
            default: " ",
            env: "SMTP_USER",
        },
        password: {
            format: String,
            default: " ",
            env: "SMTP_PASSWORD",
        }
    },
    apiURL: {
        format: String,
        default: "http://localhost:3000",
        env: 'API_URL'
    }
};
const config = (0, convict_1.default)(schema);
config.validate({ allowed: 'strict' });
exports.default = config;
//# sourceMappingURL=config.js.map