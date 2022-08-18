import { Body, Controller, Get, Header, Path, Post, Route, Tags, Security, Request } from "tsoa";
import type { ExtendedRequest } from '../shared/extendedRequest'
import { CreateUserDto, LoginDto, Token, UserDto } from "./userDto";
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
  @Security("barearAuth", ["admin", "worker"])
  public async getMyUser(@Request() request: ExtendedRequest): Promise<UserDto> {
    return new UsersService().get(request.context.userId);
  }

  @Post("/login")
  public async login(@Body() body: LoginDto): Promise<Token> {
    return new UsersService().post(body);
  }

  @Get("/signup-by-link/{link}")
  public async signUpByLink(@Path() link: string): Promise<Token> {
    return null;
  }

  @Post()
  @Security("barearAuth", ["admin"])
  public async createUser(@Body() body: CreateUserDto): Promise<Token> {
    
    return new UsersService().createNewUser(body);
  }

  @Post("/logout")
  public async logOut(@Header() authorization: string): Promise<void> {
    //return null
  }
}
