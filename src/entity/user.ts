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
import { UserRole } from "../user/userDto";

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

  @Column({ nullable: true })
  tokenSalt: number;

  @Column({ nullable: true })
  activationLink: string;

  @Column({ default: false })
  activated: boolean;

  @Column()
  @Index("idx_phonenumber")
  phoneNumber: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => OrderPayment, (orderPayment) => orderPayment.clientId, {
    onDelete: 'CASCADE',
    orphanedRowAction: "delete" 
  })
  orderPayments: OrderPayment[];

  @OneToMany(() => Order, (order) => order.workerId, {
    onDelete: 'CASCADE',
    orphanedRowAction: "delete" 
  })
  orders: Order[];

  @OneToMany(() => Order, (order) => order.clientId, {
    onDelete: 'CASCADE',
    orphanedRowAction: "delete" 
  })
  orderss: Order[];
}
