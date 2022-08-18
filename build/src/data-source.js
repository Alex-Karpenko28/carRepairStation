"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const user_1 = require("./entity/user");
const orderPayment_1 = require("./entity/orderPayment");
const order_1 = require("./entity/order");
const detail_1 = require("./entity/detail");
require("dotenv/config");
exports.AppDataSource = new typeorm_1.DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: String(process.env.DB_PASSWORD),
    database: process.env.DB_NAME,
    synchronize: false,
    logging: true,
    entities: [user_1.User, orderPayment_1.OrderPayment, order_1.Order, detail_1.Detail],
});
//# sourceMappingURL=data-source.js.map