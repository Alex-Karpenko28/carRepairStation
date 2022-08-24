import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entity/user";
import { OrderPayment } from "./entity/orderPayment";
import { Order } from "./entity/order";
import { Detail } from "./entity/detail";
import  config from "./shared/config";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: config.get('db.host'),
  port: config.get('db.port'),
  username: config.get('db.user'),
  password: config.get('db.password'),
  database: config.get('db.name'),
  synchronize: false,
  logging: true,
  entities: [User, OrderPayment, Order, Detail],
});
