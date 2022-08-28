import {
    Body,
    Controller,
    Get,
    Delete,
    Path,
    Post,
    Put,
    Route,
    Tags,
    Security,
} from 'tsoa'
import { CreateOrderDto, OrderDto } from './orderDto'
import { OrderService } from './orderServise'

@Tags('order')
@Route('/orders')
export class OrdersController extends Controller {
    @Get()
    @Security('barearAuth', ['admin', 'worker'])
    public async getAllOrders(): Promise<OrderDto[]> {
        return await new OrderService().getAllOrders()
    }

    @Get('/{orderId}')
    @Security('barearAuth', ['admin', 'worker', 'client'])
    public async getOrder(@Path() orderId: number): Promise<OrderDto[]> {
        return await new OrderService().getConcreteOrder(orderId)
    }

    @Post()
    @Security('barearAuth', ['admin'])
    public async createOrder(@Body() body: CreateOrderDto): Promise<OrderDto> {
        return new OrderService().createOrder(body)
    }

    @Put('/{orderId}')
    @Security('barearAuth', ['admin', 'worker'])
    public async updateOrder(
        @Path() orderId: number,
        @Body() body: CreateOrderDto
    ): Promise<CreateOrderDto[]> {
        return new OrderService().updateConreteOrder(body, orderId)
    }

    @Delete('/{orderId}')
    @Security('barearAuth', ['admin'])
    public async deleteOrder(@Path() orderId: number): Promise<void> {
        new OrderService().deleteConcreteOrder(orderId)
    }
}
