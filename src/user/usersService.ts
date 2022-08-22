import {
  CreateUserDto,
  LoginDto,
  Token,
  UserDto,
  JWTPayload,
  UpdateUserDto,
} from "./userDto";
import { User } from "../entity/user";
import { AppDataSource } from "../data-source";
import "dotenv/config";
import * as jwt from "jsonwebtoken";
import * as bcrypt from "bcrypt";
import * as crypto from "crypto";
import * as uuid from "uuid";
import { MailService } from "../mail-servise";

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
const random = async (): Promise<number> =>
  new Promise((resolve, reject) => {
    const randomNumber: number = crypto.randomInt(0, 1000000);
    return resolve(randomNumber);
  });

const activationLinkGenerate = async (): Promise<string> =>
  new Promise((resolve, reject) => {
    const link: string = uuid.v4();
    return resolve(link);
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
      activated: user.activated,
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
    if (user.activated == false) {
      throw new Error("Activate your account");
    }
    const authenticated = await comparePass(loginDto.password, user.password);
    if (!authenticated) {
      throw new Error("Wrong password");
    }

    const numberRandom = await random();
    await userRepository
      .createQueryBuilder()
      .update(User)
      .set({ tokenSalt: numberRandom })
      .where("id = :id", { id: user.id })
      .execute();

    const payload: JWTPayload = {
      id: user.id,
      login: user.login,
      role: user.role,
      tokenSalt: numberRandom,
      activated: user.activated,
    };
    return { accessToken: await signJWT(payload) };
  }

  public async createNewUser(body: CreateUserDto): Promise<string> {
    if (!body.email || !body.password) {
      throw new Error("Incorrect email or password");
    }
    if (
      body.role != "admin" &&
      body.role != "worker" &&
      body.role != "client"
    ) {
      throw new Error("Incorrect role entry");
    }

    const candidate = await userRepository.findOneBy({
      email: body.email,
    });

    if (candidate) {
      throw new Error("User with this email already exists");
    }

    const hashPassword = await bcrypt.hash(body.password, 5);
    const activationLink = await activationLinkGenerate();
    const newUser = new User();
    newUser.login = body.login;
    newUser.password = hashPassword;
    newUser.role = body.role;
    newUser.firstName = body.firstName;
    newUser.lastName = body.lastName;
    newUser.tokenSalt = await random();
    newUser.activationLink = activationLink;
    newUser.email = body.email;
    newUser.phoneNumber = body.phoneNumber;

    await new MailService().sendActivationMail(
      body.email,
      `${process.env.API_URL}/users/signup-by-link/${activationLink}`
    );
    await userRepository.save(newUser);
    const user = await userRepository.findOneBy({
      login: body.login,
    });

    return "User create";
  }

  public async updateUser(body: UpdateUserDto, id: number): Promise<Token> {
    const userToUpdate = await userRepository.findOneBy({
      id: id,
    });

    if (
      body.email !== userToUpdate.email ||
      body.login !== userToUpdate.login
    ) {
      const candidate = await userRepository.findOneBy({
        email: body.email,
      });

      if (candidate) {
        throw new Error("User with this email already exists");
      }
      const candidateLogin = await userRepository.findOneBy({
        email: body.login,
      });

      if (candidateLogin) {
        throw new Error("User with this login already exists");
      }
    }
    const hashPassword = await bcrypt.hash(body.password, 5);
    const numberRandom = await random();
    await userRepository.update(id, {
      login: body.login,
      password: hashPassword,
      firstName: body.firstName,
      lastName: body.lastName,
      email: body.email,
      phoneNumber: body.phoneNumber,
      tokenSalt: numberRandom,
    });

    const payload: JWTPayload = {
      id: id,
      login: body.login,
      role: userToUpdate.role,
      tokenSalt: numberRandom,
      activated: userToUpdate.activated,
    };

    return { accessToken: await signJWT(payload) };
  }

  public async getAllUsers(): Promise<UserDto[]> {
    const users = await userRepository
      .createQueryBuilder("user")
      .select([
        "user.id",
        "user.firstName",
        "user.lastName",
        "user.email",
        "user.phoneNumber",
      ])
      .getMany();
    return users;
  }

  public async logout(id: number): Promise<void> {
    await userRepository
      .createQueryBuilder()
      .update(User)
      .set({ tokenSalt: -1 })
      .where("id = :id", { id: id })
      .execute();
  }

  public async deleteUser(id: number): Promise<void> {
    await userRepository
      .createQueryBuilder()
      .delete()
      .from(User)
      .where("id = :id", { id: id })
      .execute();
  }

  public async sign_UpByLink(link: string): Promise<Token> {
    const user = await userRepository.findOneBy({
      activationLink: link,
    });
    if (!user) {
      throw new Error("Incorrect activation link");
    }
    await userRepository
      .createQueryBuilder()
      .update(User)
      .set({ activated: true, activationLink: null })
      .where("id = :id", { id: user.id })
      .execute();

    const payload: JWTPayload = {
      id: user.id,
      login: user.login,
      role: user.role,
      tokenSalt: user.tokenSalt,
      activated: true,
    };
    return { accessToken: await signJWT(payload) };
  }
}
