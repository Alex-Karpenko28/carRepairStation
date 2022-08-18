import { Body, Controller, Get, Path, Post, Put, Route, Tags } from "tsoa";
import { CreateOrderPaymentDto } from "./orderPayment.dto";


@Tags("orderPayment")
@Route("/orderPayment")
export class OrderPaymentController extends Controller {
  @Get()
  public async getAllPayment(): Promise<CreateOrderPaymentDto> {
    return null;
  }

  @Get("/{orderPaymentId}")
  public async getOrderPayment(@Path() orderPaymentId: number): Promise<CreateOrderPaymentDto> {
    return null;
  }

  @Post()
  public async createOrderPayment( @Body() body: CreateOrderPaymentDto): Promise<CreateOrderPaymentDto> {
    return null;
  }

  @Put("/{orderPaymentId}")
  public async updateOrderPayment(@Path() orderPaymentId: number, @Body() body: CreateOrderPaymentDto): Promise<CreateOrderPaymentDto> {
    return null;
  }

}