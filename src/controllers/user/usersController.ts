import { Body, Controller, Get, Header, Path, Post, Route, Tags } from "tsoa";
import { CreateUserDto, LoginDto, Tokens, User } from "./user.dto";

@Tags("user")
@Route("/users")
export class UsersController extends Controller {
  @Get()
  public async getAllUser(): Promise<User> {
    return null;
  }

  @Get("/{userId}")
  public async getUser(@Path() userId: number): Promise<User> {
    return null;
  }

  @Post("/login")
  public async login(@Body() body: LoginDto): Promise<Tokens> {
    return null;
  }

  @Get("/signup-by-link/{link}")
  public async signUpByLink(@Path() link: string): Promise<Tokens> {
    return null;
  }

  @Post()
  public async createUser(@Body() body: CreateUserDto): Promise<void> {
    //return null
  }

  @Post("/logout")
  public async logOut(@Header() authorization: string): Promise<void> {
    //return null
  }
}
