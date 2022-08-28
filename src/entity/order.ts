import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
  JoinColumn
} from "typeorm";
import { Detail } from "./detail";
import { User } from "./user";
import { OrderStatus } from "../order/orderDto"


@Entity("order")
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: "enum",
    enum: OrderStatus,
    default: OrderStatus.DIAGNOSTIC,
  })
  orderStatus: OrderStatus;

  @Column()
  orderDescription: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Detail, (detail) => detail.order)
  details: Detail[];

  @ManyToOne(() => User, (worker) => worker.orders,{
    onDelete: 'CASCADE',
    orphanedRowAction: "delete" 
  })
  @JoinColumn({ name: 'workerId' })
  workerId: number;

  @ManyToOne(() => User, (client) => client.orderss,{
    onDelete: 'CASCADE',
    orphanedRowAction: "delete"
  })
  @JoinColumn({ name: 'clientId' })
  clientId: number;
}

