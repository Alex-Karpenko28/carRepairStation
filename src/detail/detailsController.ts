import { Body, Controller, Get, Path, Post,Put, Delete, Route, Tags } from "tsoa";
import { CreateDetailDto } from "./detailDto";

@Tags("detail")
@Route("/details")
export class DetailsController extends Controller {
  @Get()
  public async getAllDetails(): Promise<CreateDetailDto> {
    return null;
  }

  @Get("/{detailId}")
  public async getDetail(@Path() detailId: number): Promise<CreateDetailDto> {
    return null;
  }

  @Post()
  public async createDetail(@Body() body: CreateDetailDto): Promise<CreateDetailDto> {
    return null;
  }

  @Put("/{detailId}")
  public async updateDetail(@Path() detailId: number, @Body() body: CreateDetailDto): Promise<CreateDetailDto> {
    return null;
  }

  @Delete("/{detailId}")
  public async deleteDetail(@Path() detailId: number): Promise<void> {
    //return null;
  }


}
