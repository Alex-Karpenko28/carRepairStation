import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  Index,
} from "typeorm";
import { OrderPayment } from "./orderPayment";
import { Order } from "./order";

export enum UserRole {
  ADMIN = "admin",
  WORKER = "worker",
  CLIENT = "client",
}

@Entity("user")
@Unique(["login", "email"])
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  login: string;

  @Column()
  password: string;

  @Column({
    type: "enum",
    enum: UserRole,
    default: UserRole.CLIENT,
  })
  role: UserRole;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column()
  @Index("idx_phonenumber")
  phoneNumber: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => OrderPayment, (orderPayment) => orderPayment.client)
  orderPayments: OrderPayment[];

  @OneToMany(() => Order, (order) => order.worker)
  orders: Order[];

  @OneToMany(() => Order, (order) => order.client)
  orderss: Order[];
}
