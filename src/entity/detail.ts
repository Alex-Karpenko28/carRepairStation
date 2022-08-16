import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from "typeorm";
import { Order } from "./order";

@Entity("detail")
export class Detail {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  detailTitle: string;

  @Column()
  detailPartNumber: string;

  @Column({ default: 1 })
  qty: number;

  @Column({ default: false })
  avalabilityInWarehouse: boolean;

  @Column({ type: "numeric", precision: 10, scale: 3 })
  detailPrice: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Order, (order) => order.id)
  order: Order;
}

