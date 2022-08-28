export interface CreateOrderDto {
  workerId: number;
  clientId: number;
  orderStatus: OrderStatus;
  orderDescription:string;
}

export enum OrderStatus {
  DIAGNOSTIC = "diagnostic",
  OrderingSpareParts = "ordering spare parts",
  REPAIR = "repair",
  READY = "ready",
}

export interface OrderDto {
  id: number;
  workerId: number;
  clientId: number;
  orderStatus: string;
  orderDescription:string;
}