import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
} from "typeorm";
import { Detail } from "./detail";
import { User } from "./user";

export enum OrderStatus {
  DIAGNOSTIC = "diagnostic",
  OrderingSpareParts = "ordering spare parts",
  REPAIR = "repair",
  READY = "ready",
}

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

  @ManyToOne(() => User, (worker) => worker.id,{
    onDelete: 'CASCADE',
    orphanedRowAction: "delete" // NEW
  })
  worker: User;

  @ManyToOne(() => User, (client) => client.id,{
    onDelete: 'CASCADE',
    orphanedRowAction: "delete" // NEW
  })
  client: User;
}

