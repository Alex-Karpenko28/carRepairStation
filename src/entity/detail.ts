import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn
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

  @Column({ type: "numeric", precision: 15, scale: 5 })
  detailPrice: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Order, (order) => order.id,{
    onDelete: 'CASCADE',
    orphanedRowAction: "delete" 
  })
  @JoinColumn({ name: 'orderId' })
  orderId: number;
}

