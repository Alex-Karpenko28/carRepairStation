import { CreateOrderPaymentDto, OrderPaymentDto, UpdateOrderPaymentDto } from './orderPaymentDto'
import { OrderPayment } from '../entity/orderPayment'
import { AppDataSource } from '../data-source'
import { ApiError } from '../error/ApiError'
import { ErrorsList } from '../error/ApiErrorList'
import { StatusCodes } from 'http-status-codes'
import { Detail } from '../entity/detail'

const detailRepository = AppDataSource.getRepository(Detail)
const orderPaymentRepository = AppDataSource.getRepository(OrderPayment)


async function detailsPriceSummary(orderId: number): Promise<number> {
    const detailPriceSumDataBase = await detailRepository.find({
        relations: {
            orderId: true,
        },
        where: { orderId: { id: orderId } },
        select: {
            detailPrice: true,
        },
    })

    return detailPriceSumDataBase.reduce(
        (accumulator, item) => accumulator + Number(item.detailPrice),
        0
    ) 
}

export class OrderPaymentService {

  public async getAllOrdersPayments(): Promise<OrderPaymentDto[]> {
    const orders = await orderPaymentRepository.find({
      relations: {
          orderId: true,
          clientId: true,
      },
      select: {
          orderId: {id:true},
          clientId: {id:true},
      },
  })
    return orders
}

public async getConcreteOrderPayment(id: number): Promise<OrderPaymentDto[]> {
  const orderPayment = await orderPaymentRepository.find({
    relations: {
      orderId: true,
      clientId: true,
  },
  select: {
      orderId: {id:true},
      clientId: {id:true},
  },
      where: { id: id },
  })
  if (!orderPayment) {
      throw new ApiError(
          ErrorsList.OrderNotFound,
          StatusCodes.BAD_REQUEST,
          'order payment not found'
      )
  }
  return orderPayment
}


    public async createOrderPayment(
        orderPayParam: CreateOrderPaymentDto
    ): Promise<OrderPaymentDto> {

        const newOrderPay = new OrderPayment()
        newOrderPay.orderId = orderPayParam.orderId
        newOrderPay.clientId = orderPayParam.clientId
        newOrderPay.workPrice = orderPayParam.workPrice
        newOrderPay.detailPriceSum = await detailsPriceSummary(orderPayParam.orderId)

        let orderPay
        try {
            orderPay = await orderPaymentRepository.save(newOrderPay)
        } catch (err) {
            if (err.code == '23503') {
                throw new ApiError(
                    ErrorsList.WrongId,
                    StatusCodes.BAD_REQUEST,
                    'ClientId or orderId does not exist'
                )
            }
        }

        const createdOrderPayment: OrderPaymentDto = {
            clientId: orderPay.clientId,
            orderId: orderPay.orderId,
            detailPriceSum: orderPay.detailPriceSum,
            workPrice: orderPay.workPrice,
            paymentConformation: orderPay.paymentConformation,
        }

        return createdOrderPayment
    }

    public async updateConreteOrderPayment(
      body: UpdateOrderPaymentDto,
      id: number
  ): Promise<OrderPaymentDto[]> {
    
    const orderPaymentCheck = await orderPaymentRepository.find({
          where: { id: id },
      })
      
      if (!orderPaymentCheck[0]) {
          throw new ApiError(
              ErrorsList.OrderNotFound,
              StatusCodes.BAD_REQUEST,
              'order payment not found'
          )
      }

      try {
          await orderPaymentRepository.update(id, {
            clientId: body.clientId,
            orderId: body.orderId,
            detailPriceSum: await detailsPriceSummary(body.orderId),
            workPrice: body.workPrice,
            paymentConformation: body.paymentConformation
          })
      } catch (err) {
          if (err.code == '23503') {
              throw new ApiError(
                  ErrorsList.WrongId,
                  StatusCodes.BAD_REQUEST,
                  'ClientId or orderId does not exist'
              )
          }
      }

      const orderPayment = await orderPaymentRepository.find({
        relations: {
          orderId: true,
          clientId: true,
      },
      select: {
          orderId: {id:true},
          clientId: {id:true},
      },
      where: { id: id },
      })

      return orderPayment
  }
}



