"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const user_1 = require("./entity/user");
const orderPayment_1 = require("./entity/orderPayment");
const order_1 = require("./entity/order");
const detail_1 = require("./entity/detail");
const config_1 = __importDefault(require("./shared/config"));
exports.AppDataSource = new typeorm_1.DataSource({
    type: 'postgres',
    host: config_1.default.get('db.host'),
    port: config_1.default.get('db.port'),
    username: config_1.default.get('db.user'),
    password: config_1.default.get('db.password'),
    database: config_1.default.get('db.name'),
    synchronize: true,
    logging: true,
    entities: [user_1.User, orderPayment_1.OrderPayment, order_1.Order, detail_1.Detail],
});
//# sourceMappingURL=data-source.js.map