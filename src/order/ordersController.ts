import { Body, Controller, Get, Delete, Path, Post, Put, Route, Tags } from "tsoa";
import { CreateOrderDto } from "./order.dto";


@Tags("order")
@Route("/orders")
export class OrdersController extends Controller {
  @Get()
  public async getAllOrders(): Promise<CreateOrderDto> {
    return null;
  }

  @Get("/{orderId}")
  public async getOrder(@Path() orderId: number): Promise<CreateOrderDto> {
    return null;
  }

  @Post()
  public async createOrder(@Body() body: CreateOrderDto): Promise<CreateOrderDto> {
    return null;
  }

  @Put("/{orderId}")
  public async updateOrder(@Path() orderId: number, @Body() body: CreateOrderDto): Promise<CreateOrderDto> {
    return null;
  }

  @Delete("/{orderId}")
  public async deleteOrder(@Path() orderId: number): Promise<void> {
    //return null;
  }

}