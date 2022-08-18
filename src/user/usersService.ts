import {
  CreateUserDto,
  LoginDto,
  Token,
  UserDto,
  JWTPayload,
  UserRole,
} from "./userDto";
import { User } from "../entity/user";
import { AppDataSource } from "../data-source";
import "dotenv/config";
import * as jwt from "jsonwebtoken";
import * as bcrypt from "bcrypt";

const userRepository = AppDataSource.getRepository(User);

const comparePass = (password: string, hash: string): Promise<boolean> =>
  bcrypt.compare(password, hash);

const signJWT = async (data: JWTPayload): Promise<string> =>
  new Promise((resolve, reject) => {
    jwt.sign(data, process.env.SECRET_KEY, { expiresIn: "12h" }, (err, res) => {
      if (err) {
        return reject(err);
      }
      return resolve(res);
    });
  });


export class UsersService {
  public async get(id: number): Promise<UserDto> {
    const user = await userRepository.findOneBy({
      id: id,
    });
    if (!user) {
      throw new Error("User not found");
    }
    const userInfo: UserDto = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phoneNumber: user.phoneNumber,
    };
    return userInfo;
  }

  public async post(loginDto: LoginDto): Promise<Token> {
    const user = await userRepository.findOneBy({
      login: loginDto.login,
    });
    if (!user) {
      throw new Error("Wrong login");
    }
    const authenticated = await comparePass(loginDto.password, user.password);
    if (!authenticated) {
      throw new Error("Wrong password");
    }
    const payload: JWTPayload = {
      id: user.id,
      login: user.login,
      role: user.role,
    };
    return { accessToken: await signJWT(payload) };
  }

  public async createNewUser(body: CreateUserDto): Promise<Token> {
    if (!body.email || !body.password) {
      throw new Error("Incorrect email or password");
    }
    if (body.role != ("admin" || "worker" || "client")) {
      throw new Error("Incorrect role entry");
    }

    const candidate = await userRepository.findOneBy({
      email: body.email,
    });

    if (candidate) {
      throw new Error("User with this email already exists");
    }

    const hashPassword = await bcrypt.hash(body.password, 5);
    const newUser = new User();
    newUser.login = body.login;
    newUser.password = hashPassword;
    newUser.role = body.role;
    newUser.firstName = body.firstName;
    newUser.lastName = body.lastName;
    newUser.email = body.email;
    newUser.phoneNumber = body.phoneNumber;

    await userRepository.save(newUser);
    const user = await userRepository.findOneBy({
      login: body.login,
    });
    const payload: JWTPayload = {
      id: user.id,
      login: user.login,
      role: user.role,
    };
    return { accessToken: await signJWT(payload) };
  }

  public async getAllUsers(): Promise<UserDto[]> {
    const users = await userRepository
      .createQueryBuilder("user")
      .select(["user.id", "user.firstName","user.lastName", "user.email", "user.phoneNumber" ])
      .getMany();
    return users ;
  }
}


// export interface UserDto {
//   id: number;
//   firstName: string;
//   lastName: string;
//   email: string;
//   phoneNumber: string;
// }