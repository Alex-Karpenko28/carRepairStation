import {
    Body,
    Controller,
    Get,
    Path,
    Post,
    Put,
    Delete,
    Route,
    Tags,
    Security,
} from 'tsoa'
import { CreateDetailDto, DetailDto } from './detailDto'
import { DetailService } from './detailService'

@Tags('detail')
@Route('/details')
export class DetailsController extends Controller {
    @Get()
    @Security('barearAuth', ['admin', 'worker'])
    public async getAllDetails(): Promise<DetailDto[]> {
        return new DetailService().getAllDetails()
    }

    @Get('/{detailId}')
    @Security('barearAuth', ['admin', 'worker'])
    public async getDetail(@Path() detailId: number): Promise<DetailDto[]> {
        return new DetailService().getConcreteDetail(detailId)
    }

    @Post()
    @Security('barearAuth', ['admin', 'worker'])
    public async createDetail(
        @Body() body: CreateDetailDto
    ): Promise<DetailDto> {
        return new DetailService().createDetail(body)
    }

    @Put('/{detailId}')
    @Security('barearAuth', ['admin', 'worker'])
    public async updateDetail(
        @Path() detailId: number,
        @Body() body: CreateDetailDto
    ): Promise<DetailDto[]> {
        return new DetailService().updateConreteDetail(body, detailId)
    }

    @Delete('/{detailId}')
    @Security('barearAuth', ['admin', 'worker'])
    public async deleteDetail(@Path() detailId: number): Promise<void> {
        new DetailService().deleteConcreteDetail(detailId)
    }
}
