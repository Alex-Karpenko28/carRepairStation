import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
  ManyToOne,
} from "typeorm";
import { Order } from "./order";
import { User } from "./user";

@Entity("orderPayment")
export class OrderPayment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "numeric", precision: 10, scale: 3 })
  detailPriceSum: number;

  @Column({ type: "numeric", precision: 10, scale: 3 })
  workPrice: number;

  @Column({ default: false })
  paymentConformation: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToOne(() => Order)
  @JoinColumn()
  order: Order;

  @ManyToOne(() => User, (client) => client.id)
  client: User;
}
