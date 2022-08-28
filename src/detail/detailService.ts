import { CreateDetailDto, DetailDto } from './detailDto'
import { Detail } from '../entity/detail'
import { AppDataSource } from '../data-source'
import { ApiError } from '../error/ApiError'
import { ErrorsList } from '../error/ApiErrorList'
import { StatusCodes } from 'http-status-codes'

const detailRepository = AppDataSource.getRepository(Detail)

export class DetailService {
    public async getAllDetails(): Promise<DetailDto[]> {
        const details: any[] = await detailRepository
            .createQueryBuilder('detail')
            .leftJoinAndSelect('detail.orderId', 'details')
            .getMany()

        return details.map((e) => ({
            ...e,
            orderId: e.orderId?.id,
        }))
    }

    public async getConcreteDetail(id: number): Promise<DetailDto[]> {
        const detail: any[] = await detailRepository.find({
            relations: {
                orderId: true,
            },
            where: { id: id },
        })
        if (!detail) {
            throw new ApiError(
                ErrorsList.DetailNotFound,
                StatusCodes.BAD_REQUEST,
                'detail not found'
            )
        }
        return detail.map((e) => ({
            ...e,
            orderId: e.orderId?.id,
        }))
    }

    public async createDetail(
        detailParam: CreateDetailDto
    ): Promise<DetailDto> {
        const newDetail = new Detail()
        newDetail.orderId = detailParam.orderId
        newDetail.detailTitle = detailParam.detailTitle
        newDetail.detailPartNumber = detailParam.detailPartNumber
        newDetail.avalabilityInWarehouse = detailParam.avalabilityInWarehouse
        newDetail.detailPrice = detailParam.detailPrice
        newDetail.qty = detailParam.qty

        let detail

        try {
            detail = await detailRepository.save(newDetail)
        } catch (err) {
            if (err.code == '23503') {
                throw new ApiError(
                    ErrorsList.WrongIdOrd,
                    StatusCodes.BAD_REQUEST,
                    'OrderId does not exist'
                )
            }
        }

        const createdDetail: DetailDto = {
            id: detail.id,
            orderId: detail.orderId,
            detailTitle: detail.detailTitle,
            detailPartNumber: detail.detailPartNumber,
            avalabilityInWarehouse: detail.avalabilityInWarehouse,
            detailPrice: detail.detailPrice,
            qty: detail.qty,
        }
        return createdDetail
    }

    public async updateConreteDetail(
        body: CreateDetailDto,
        id: number
    ): Promise<DetailDto[]> {
        try {
            await detailRepository.update(id, {
                orderId: body.orderId,
                detailTitle: body.detailTitle,
                detailPartNumber: body.detailPartNumber,
                avalabilityInWarehouse: body.avalabilityInWarehouse,
                detailPrice: body.detailPrice,
                qty: body.qty,
            })
        } catch (err) {
            if (err.code == '23503') {
                throw new ApiError(
                    ErrorsList.WrongIdOrd,
                    StatusCodes.BAD_REQUEST,
                    'OrderId does not exist'
                )
            }
        }

        const detail: any[] = await detailRepository.find({
            relations: {
                orderId: true,
            },
            where: { id: id },
        })

        return detail.map((e) => ({
            ...e,
            orderId: e.orderId?.id,
        }))
    }

    public async deleteConcreteDetail(id: number): Promise<void> {
        await detailRepository
            .createQueryBuilder()
            .delete()
            .from(Detail)
            .where('id = :id', { id: id })
            .execute()
    }
}

