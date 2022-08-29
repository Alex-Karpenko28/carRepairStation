export interface CreateOrderPaymentDto {
  clientId: number;
  orderId: number;
  workPrice:number;
}


export interface OrderPaymentDto {
  clientId: number;
  orderId: number;
  detailPriceSum: number;
  workPrice:number;
  paymentConformation: boolean;
}

export interface UpdateOrderPaymentDto {
  clientId: number;
  orderId: number;
  workPrice:number;
  paymentConformation: boolean;
}
