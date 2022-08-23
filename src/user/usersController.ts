import {
  Body,
  Controller,
  Get,
  Path,
  Post,
  Put,
  Route,
  Tags,
  Security,
  Request,
  Delete,
} from "tsoa";
import type { ExtendedRequest } from "../shared/extendedRequest";
import {
  CreateUserDto,
  LoginDto,
  Token,
  UserDto,
  UpdateUserDto,
} from "./userDto";
import { UsersService } from "./usersService";

@Tags("user")
@Route("/users")
export class UsersController extends Controller {
  @Get()
  @Security("barearAuth", ["admin", "worker"])
  public async getAllUser(): Promise<UserDto[]> {
    return new UsersService().getAllUsers();
  }

  @Get("/{userId}")
  @Security("barearAuth", ["admin", "worker"])
  public async getUser(@Path() userId: number): Promise<UserDto> {
    return new UsersService().get(userId);
  }

  @Get("/get/me")
  @Security("barearAuth", ["client"])
  public async getMyUser(
    @Request() request: ExtendedRequest
  ): Promise<UserDto> {
    return new UsersService().get(request.context.userId);
  }

  @Put("/get/me")
  @Security("barearAuth", ["client"])
  public async updateMyUser(
    @Body() body: UpdateUserDto,
    @Request() request: ExtendedRequest
  ): Promise<Token> {
    return new UsersService().updateUser(body, request.context.userId);
  }

  @Delete("/get/me")
  @Security("barearAuth", ["client"])
  public async deleteMyUser(
    @Request() request: ExtendedRequest
  ): Promise<void> {
    new UsersService().deleteUser(request.context.userId);
  }

  @Post("/login")
  public async login(@Body() body: LoginDto): Promise<Token> {
    return new UsersService().post(body);
  }

  @Get("/signup-by-link/{link}")
  public async signUpByLink(@Path() link: string): Promise<Token> {
    return new UsersService().sign_UpByLink(link);
  }

  @Post()
  @Security("barearAuth", ["admin"])
  public async createUser(@Body() body: CreateUserDto): Promise<void> {
    return new UsersService().createNewUser(body);
  }

  @Delete("/{userId}")
  @Security("barearAuth", ["admin", "worker"])
  public async deleteconcreteUser(@Path() userId: number): Promise<void> {
    new UsersService().deleteUser(userId);
  }

  @Put("/{userId}")
  @Security("barearAuth", ["admin", "worker"])
  public async updateConcreteUser(
    @Body() body: UpdateUserDto,
    @Path() userId: number
  ): Promise<Token> {
    return new UsersService().updateUser(body,userId);
  }

  @Post("/logout")
  @Security("barearAuth", ["admin", "worker", "client"])
  public async logOut(@Request() request: ExtendedRequest): Promise<void> {
    new UsersService().logout(request.context.userId);
  }
}
