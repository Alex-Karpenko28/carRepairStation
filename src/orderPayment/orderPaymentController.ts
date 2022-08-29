import { Body, Controller, Get, Path, Post, Put, Route, Tags, Security } from "tsoa";
import { CreateOrderPaymentDto, OrderPaymentDto, UpdateOrderPaymentDto } from "./orderPaymentDto";
import { OrderPaymentService } from "./orderPaymentServise"

@Tags("orderPayment")
@Route("/orderPayment")
export class OrderPaymentController extends Controller {
  @Get()
  @Security('barearAuth', ['admin'])
  public async getAllPayment(): Promise<OrderPaymentDto[]> {
    return new OrderPaymentService().getAllOrdersPayments()
  }

  @Get("/{orderPaymentId}")
  @Security('barearAuth', ['admin', 'client'])
  public async getOrderPayment(@Path() orderPaymentId: number): Promise<OrderPaymentDto[]> {
    return new OrderPaymentService().getConcreteOrderPayment(orderPaymentId)
  }

  @Post()
  @Security('barearAuth', ['admin'])
  public async createOrderPayment( @Body() body: CreateOrderPaymentDto): Promise<OrderPaymentDto> {
    return new OrderPaymentService().createOrderPayment(body)
  }

  @Put("/{orderPaymentId}")
  @Security('barearAuth', ['admin'])
  public async updateOrderPayment(@Path() orderPaymentId: number, @Body() body: UpdateOrderPaymentDto): Promise<OrderPaymentDto[]> {
    return new OrderPaymentService().updateConreteOrderPayment(body, orderPaymentId)
  }

}