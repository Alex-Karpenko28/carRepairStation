"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.models = void 0;
const db_1 = require("../db");
const sequelize_1 = __importDefault(require("sequelize"));
const User = db_1.dbConfig.define('user', {
    id: { type: sequelize_1.default.INTEGER, primaryKey: true, autoIncrement: true },
    login: { type: sequelize_1.default.STRING, unique: true, allowNull: false },
    password: { type: sequelize_1.default.STRING, allowNull: false },
    role: { type: sequelize_1.default.STRING, defaultValue: "USER" },
    firstName: { type: sequelize_1.default.STRING, allowNull: false },
    lastName: { type: sequelize_1.default.STRING, allowNull: false },
    email: { type: sequelize_1.default.STRING, unique: true, allowNull: false },
    phoneNumber: { type: sequelize_1.default.STRING, allowNull: false },
});
const Detail = db_1.dbConfig.define('detail', {
    id: { type: sequelize_1.default.INTEGER, primaryKey: true, autoIncrement: true },
    detailTitle: { type: sequelize_1.default.STRING, allowNull: false },
    detailPartNumber: { type: sequelize_1.default.STRING, allowNull: false },
    avalabilityInWarehouse: { type: sequelize_1.default.BOOLEAN, defaultValue: false },
    detailPrice: { type: sequelize_1.default.DECIMAL, allowNull: false },
});
const Order = db_1.dbConfig.define('detail', {
    id: { type: sequelize_1.default.INTEGER, primaryKey: true, autoIncrement: true },
    workerid: { type: sequelize_1.default.INTEGER, allowNull: false },
    clientid: { type: sequelize_1.default.INTEGER, allowNull: false },
    orderStatus: { type: sequelize_1.default.STRING },
    orderDescription: { type: sequelize_1.default.STRING },
});
const OrderPayment = db_1.dbConfig.define('detail', {
    id: { type: sequelize_1.default.INTEGER, primaryKey: true, autoIncrement: true },
    detailPriceSum: { type: sequelize_1.default.DECIMAL },
    workPrice: { type: sequelize_1.default.DECIMAL },
    paymentConformation: { type: sequelize_1.default.BOOLEAN, defaultValue: false },
});
Order.hasOne(Detail);
Detail.belongsTo(Order);
Order.hasOne(OrderPayment);
OrderPayment.belongsTo(Order);
Order.hasOne(User);
User.belongsTo(Order);
OrderPayment.hasOne(User);
User.belongsTo(OrderPayment);
exports.models = {
    User,
    Detail,
    Order,
    OrderPayment
};
//# sourceMappingURL=models.js.map