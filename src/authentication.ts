import type { ExtendedRequest } from './shared/extendedRequest'
import * as jwt from 'jsonwebtoken'
import { JWTPayload } from './user/userDto'
import { User } from './entity/user'
import { AppDataSource } from './data-source'
import config from './shared/config'
import { ApiError } from './error/ApiError'
import { ErrorsList } from './error/ApiErrorList'
import { StatusCodes } from 'http-status-codes'

const verifyJWT = async (token: string): Promise<JWTPayload> =>
    new Promise((resolve, reject) => {
        jwt.verify(token, config.get('token.secretKey'), (err, data) => {
            if (err) {
                return reject(err)
            }
            return resolve(data as JWTPayload)
        })
    })

const userRepository = AppDataSource.getRepository(User)

export async function expressAuthentication(
    request: ExtendedRequest,
    securityName: string,
    roles?: string[] // admin worker client
): Promise<any> {
        if (securityName !== 'barearAuth') return undefined
    const authorization = request.headers.authorization
    if (!authorization) {
        throw new ApiError(
            ErrorsList.NotAuthorized,
            StatusCodes.UNAUTHORIZED,
            'Not Authorized'
        )
    }

      let payload: JWTPayload
    try {
        payload = await verifyJWT(authorization)
    } catch (err) {
        throw new ApiError(
            ErrorsList.NotAuthorized,
            StatusCodes.UNAUTHORIZED,
            'Not Authorized'
        )
    }

        const role = payload.role

    if (!roles.includes(role)) {
        throw new ApiError(
            ErrorsList.NotAuthorized,
            StatusCodes.FORBIDDEN,
            'Forbidden! User is not authorized'
        )
    }

    const user = await userRepository.findOneBy({
        id: payload.id,
    })

    if (payload.tokenSalt != user.tokenSalt) {
        throw new ApiError(
            ErrorsList.NotAuthorized,
            StatusCodes.UNAUTHORIZED,
            'Not Authorized'
        )
    }

    request.context = { userId: payload.id }
}
