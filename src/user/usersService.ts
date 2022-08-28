import {
    CreateUserDto,
    LoginDto,
    Token,
    UserDto,
    JWTPayload,
    UpdateUserDto,
} from './userDto'
import { User } from '../entity/user'
import { AppDataSource } from '../data-source'
import * as jwt from 'jsonwebtoken'
import * as bcrypt from 'bcrypt'
import * as crypto from 'crypto'
import { MailService } from '../shared/mail-servise'
import { ApiError } from '../error/ApiError'
import { ErrorsList } from '../error/ApiErrorList'
import { StatusCodes } from 'http-status-codes'
import config from '../shared/config'

const SALT_RANGE_DOWN = 0
const SALT_RANGE_UP = 1000000

const userRepository = AppDataSource.getRepository(User)

const comparePass = (password: string, hash: string): Promise<boolean> =>
    bcrypt.compare(password, hash)

const signJWT = async (data: JWTPayload): Promise<string> =>
    new Promise((resolve, reject) => {
        jwt.sign(
            data,
            config.get('token.secretKey'),
            { expiresIn: config.get('token.life') },
            (err, res) => {
                if (err) {
                    return reject(err)
                }
                return resolve(res)
            }
        )
    })
const random = async (): Promise<number> =>
    new Promise((resolve, reject) => {
        crypto.randomInt(SALT_RANGE_DOWN, SALT_RANGE_UP, (err, value) => {
            if (err) {
                return reject(err)
            }
            return resolve(value)
        })
    })

const activationLinkGenerate = () => crypto.randomUUID()

export class UsersService {
    public async get(id: number): Promise<UserDto> {
        const user = await userRepository.findOneBy({
            id: id,
        })
        if (!user) {
            throw new ApiError(
                ErrorsList.UserNotFound,
                StatusCodes.BAD_REQUEST,
                'user not found'
            )
        }
        const userInfo: UserDto = {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            phoneNumber: user.phoneNumber,
            activated: user.activated,
        }
        return userInfo
    }

    public async post(loginDto: LoginDto): Promise<Token> {
        const user = await userRepository.findOneBy({
            login: loginDto.login,
        })
        if (!user) {
            throw new ApiError(
                ErrorsList.WrongLogin,
                StatusCodes.BAD_REQUEST,
                'wrong login'
            )
        }
        if (user.activated == false) {
            throw new Error('Activate your account')
        }
        const authenticated = await comparePass(
            loginDto.password,
            user.password
        )
        if (!authenticated) {
            throw new ApiError(
                ErrorsList.WrongPassword,
                StatusCodes.BAD_REQUEST,
                'wrong password'
            )
        }

        const numberRandom = await random()

        await userRepository
            .createQueryBuilder()
            .update(User)
            .set({ tokenSalt: numberRandom })
            .where('id = :id', { id: user.id })
            .execute()

        const payload: JWTPayload = {
            id: user.id,
            login: user.login,
            role: user.role,
            tokenSalt: numberRandom,
            activated: user.activated,
        }
        return { accessToken: await signJWT(payload) }
    }

    public async createNewUser(body: CreateUserDto): Promise<void> {
        if (!body.email || !body.password) {
            throw new ApiError(
                ErrorsList.IncEmaOrPass,
                StatusCodes.BAD_REQUEST,
                'Incorrect email or password'
            )
        }
        if (
            body.role != 'admin' &&
            body.role != 'worker' &&
            body.role != 'client'
        ) {
            throw new ApiError(
                ErrorsList.IncorrectRolle,
                StatusCodes.BAD_REQUEST,
                'Incorrect role entry'
            )
        }

        const candidate = await userRepository.findOneBy({
            email: body.email,
        })

        if (candidate) {
            throw new ApiError(
                ErrorsList.EmailExist,
                StatusCodes.BAD_REQUEST,
                'User with this email already exists'
            )
        }


        const hashPassword = await bcrypt.hash(
            body.password,
            config.get('saltRounds')
        )

        const activationLink = await activationLinkGenerate()
        const newUser = new User()
        newUser.login = body.login
        newUser.password = hashPassword
        newUser.role = body.role
        newUser.firstName = body.firstName
        newUser.lastName = body.lastName
        newUser.tokenSalt = await random()
        newUser.activationLink = activationLink
        newUser.email = body.email
        newUser.phoneNumber = body.phoneNumber

        await new MailService().sendActivationMail(
            body.email,
            `${config.get('apiURL')}/users/signup-by-link/${activationLink}`
        )

        await userRepository.save(newUser)
    }

    public async updateUser(body: UpdateUserDto, id: number): Promise<Token> {
        const userToUpdate = await userRepository.findOneBy({
            id: id,
        })

        if (
            body.email !== userToUpdate.email ||
            body.login !== userToUpdate.login
        ) {
            const candidate = await userRepository.findOneBy({
                email: body.email,
            })

            if (candidate) {
                throw new ApiError(
                    ErrorsList.EmailExist,
                    StatusCodes.BAD_REQUEST,
                    'User with this email already exists'
                )
            }
            const candidateLogin = await userRepository.findOneBy({
                email: body.login,
            })

            if (candidateLogin) {
                throw new ApiError(
                    ErrorsList.EmailLogin,
                    StatusCodes.BAD_REQUEST,
                    'User with this login already exists'
                )
            }
        }
        const hashPassword = await bcrypt.hash(
            body.password,
            config.get('saltRounds')
        )
        const numberRandom = await random()
        await userRepository.update(id, {
            login: body.login,
            password: hashPassword,
            firstName: body.firstName,
            lastName: body.lastName,
            email: body.email,
            phoneNumber: body.phoneNumber,
            tokenSalt: numberRandom,
        })

        const payload: JWTPayload = {
            id: id,
            login: body.login,
            role: userToUpdate.role,
            tokenSalt: numberRandom,
            activated: userToUpdate.activated,
        }

        return { accessToken: await signJWT(payload) }
    }

    public async getAllUsers(): Promise<UserDto[]> {
        const users = await userRepository
            .createQueryBuilder('user')
            .select([
                'user.id',
                'user.firstName',
                'user.lastName',
                'user.email',
                'user.phoneNumber',
            ])
            .getMany()
        return users
    }

    public async logout(id: number): Promise<void> {
        await userRepository
            .createQueryBuilder()
            .update(User)
            .set({ tokenSalt: -1 })
            .where('id = :id', { id: id })
            .execute()
    }

    public async deleteUser(id: number): Promise<void> {
        await userRepository
            .createQueryBuilder()
            .delete()
            .from(User)
            .where('id = :id', { id: id })
            .execute()
    }

    public async sign_UpByLink(link: string): Promise<Token> {
        const user = await userRepository.findOneBy({
            activationLink: link,
        })
        if (!user) {
            throw new ApiError(
                ErrorsList.IncorrectLink,
                StatusCodes.BAD_REQUEST,
                'Incorrect activation link'
            )
        }
        await userRepository
            .createQueryBuilder()
            .update(User)
            .set({ activated: true, activationLink: null })
            .where('id = :id', { id: user.id })
            .execute()

        const payload: JWTPayload = {
            id: user.id,
            login: user.login,
            role: user.role,
            tokenSalt: user.tokenSalt,
            activated: true,
        }
        return { accessToken: await signJWT(payload) }
    }
}
