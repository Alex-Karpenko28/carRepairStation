import { CreateOrderDto, OrderDto } from './orderDto'
import { Order } from '../entity/order'
import { AppDataSource } from '../data-source'
import { ApiError } from '../error/ApiError'
import { ErrorsList } from '../error/ApiErrorList'
import { StatusCodes } from 'http-status-codes'

const orderRepository = AppDataSource.getRepository(Order)

export class OrderService {
    public async getAllOrders(): Promise<OrderDto[]> {
        const orders = await orderRepository.find({
            relations: {
                workerId: true,
                clientId: true,
            },
            select: {
                workerId: { id: true },
                clientId: { id: true },
            }
        })
        return orders
    }

    public async getConcreteOrder(id: number): Promise<OrderDto[]> {
        const order = await orderRepository.find({
            relations: {
                clientId: true,
                workerId: true,
            },
            select: {
                workerId: { id: true },
                clientId: { id: true },
            },
            where: { id: id },
        })
        if (!order) {
            throw new ApiError(
                ErrorsList.OrderNotFound,
                StatusCodes.BAD_REQUEST,
                'order not found'
            )
        }
        return order
    }

    public async createOrder(orderParam: CreateOrderDto): Promise<OrderDto> {
        const newOrder = new Order()
        newOrder.workerId = orderParam.workerId
        newOrder.clientId = orderParam.clientId
        newOrder.orderStatus = orderParam.orderStatus
        newOrder.orderDescription = orderParam.orderDescription

        let order

        try {
            order = await orderRepository.save(newOrder)
        } catch (err) {
            if (err.code == '23503') {
                throw new ApiError(
                    ErrorsList.WrongId,
                    StatusCodes.BAD_REQUEST,
                    'ClientId or workerId does not exist'
                )
            }
        }

        const createdOrder: OrderDto = {
            id: order.id,
            workerId: order.workerId,
            clientId: order.clientId,
            orderStatus: order.orderStatus,
            orderDescription: order.orderDescription,
        }
        return createdOrder
    }
    public async deleteConcreteOrder(id: number): Promise<void> {
        await orderRepository
            .createQueryBuilder()
            .delete()
            .from(Order)
            .where('id = :id', { id: id })
            .execute()
    }

    public async updateConreteOrder(
        body: CreateOrderDto,
        id: number
    ): Promise<CreateOrderDto[]> {
        try {
            await orderRepository.update(id, {
                workerId: body.workerId,
                clientId: body.clientId,
                orderStatus: body.orderStatus,
                orderDescription: body.orderDescription,
            })
        } catch (err) {
            if (err.code == '23503') {
                throw new ApiError(
                    ErrorsList.WrongId,
                    StatusCodes.BAD_REQUEST,
                    'ClientId or workerId does not exist'
                )
            }
        }

        const order = await orderRepository.find({
            relations: {
                clientId: true,
                workerId: true,
            },
            select: {
                workerId: { id: true },
                clientId: { id: true },
            },
            where: { id: id },
        })

        return order
    }
}
