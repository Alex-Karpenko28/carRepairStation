"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const user_1 = require("../entity/user");
const data_source_1 = require("../data-source");
require("dotenv/config");
const jwt = __importStar(require("jsonwebtoken"));
const bcrypt = __importStar(require("bcrypt"));
const crypto = __importStar(require("crypto"));
const uuid = __importStar(require("uuid"));
const mail_servise_1 = require("../mail-servise");
const userRepository = data_source_1.AppDataSource.getRepository(user_1.User);
const comparePass = (password, hash) => bcrypt.compare(password, hash);
const signJWT = async (data) => new Promise((resolve, reject) => {
    jwt.sign(data, process.env.SECRET_KEY, { expiresIn: "12h" }, (err, res) => {
        if (err) {
            return reject(err);
        }
        return resolve(res);
    });
});
const random = async () => new Promise((resolve, reject) => {
    const randomNumber = crypto.randomInt(0, 1000000);
    return resolve(randomNumber);
});
const activationLinkGenerate = async () => new Promise((resolve, reject) => {
    const link = uuid.v4();
    return resolve(link);
});
class UsersService {
    async get(id) {
        const user = await userRepository.findOneBy({
            id: id,
        });
        if (!user) {
            throw new Error("User not found");
        }
        const userInfo = {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            phoneNumber: user.phoneNumber,
            activated: user.activated,
        };
        return userInfo;
    }
    async post(loginDto) {
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
            .update(user_1.User)
            .set({ tokenSalt: numberRandom })
            .where("id = :id", { id: user.id })
            .execute();
        const payload = {
            id: user.id,
            login: user.login,
            role: user.role,
            tokenSalt: numberRandom,
            activated: user.activated,
        };
        return { accessToken: await signJWT(payload) };
    }
    async createNewUser(body) {
        if (!body.email || !body.password) {
            throw new Error("Incorrect email or password");
        }
        if (body.role != "admin" &&
            body.role != "worker" &&
            body.role != "client") {
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
        const newUser = new user_1.User();
        newUser.login = body.login;
        newUser.password = hashPassword;
        newUser.role = body.role;
        newUser.firstName = body.firstName;
        newUser.lastName = body.lastName;
        newUser.tokenSalt = await random();
        newUser.activationLink = activationLink;
        newUser.email = body.email;
        newUser.phoneNumber = body.phoneNumber;
        await new mail_servise_1.MailService().sendActivationMail(body.email, `${process.env.API_URL}/users/signup-by-link/${activationLink}`);
        await userRepository.save(newUser);
        const user = await userRepository.findOneBy({
            login: body.login,
        });
        return "User create";
    }
    async updateUser(body, id) {
        const userToUpdate = await userRepository.findOneBy({
            id: id,
        });
        if (body.email !== userToUpdate.email ||
            body.login !== userToUpdate.login) {
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
        const payload = {
            id: id,
            login: body.login,
            role: userToUpdate.role,
            tokenSalt: numberRandom,
            activated: userToUpdate.activated,
        };
        return { accessToken: await signJWT(payload) };
    }
    async getAllUsers() {
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
    async logout(id) {
        await userRepository
            .createQueryBuilder()
            .update(user_1.User)
            .set({ tokenSalt: -1 })
            .where("id = :id", { id: id })
            .execute();
    }
    async deleteUser(id) {
        await userRepository
            .createQueryBuilder()
            .delete()
            .from(user_1.User)
            .where("id = :id", { id: id })
            .execute();
    }
    async sign_UpByLink(link) {
        const user = await userRepository.findOneBy({
            activationLink: link,
        });
        if (!user) {
            throw new Error("Incorrect activation link");
        }
        await userRepository
            .createQueryBuilder()
            .update(user_1.User)
            .set({ activated: true, activationLink: null })
            .where("id = :id", { id: user.id })
            .execute();
        const payload = {
            id: user.id,
            login: user.login,
            role: user.role,
            tokenSalt: user.tokenSalt,
            activated: true,
        };
        return { accessToken: await signJWT(payload) };
    }
}
exports.UsersService = UsersService;
//# sourceMappingURL=usersService.js.map