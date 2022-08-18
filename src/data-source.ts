import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entity/user";
import { OrderPayment } from "./entity/orderPayment";
import { Order } from "./entity/order";
import { Detail } from "./entity/detail";
import "dotenv/config";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: String(process.env.DB_PASSWORD),
  database: process.env.DB_NAME,
  synchronize: false,
  logging: true,
  entities: [User, OrderPayment, Order, Detail],
});
