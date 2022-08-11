export interface CreateOrderPaymentDto {
  clientId: number;
  orderId: number;
  detailPriceSum: number;
  workPrice:number;
  paymentConformation: boolean;
}