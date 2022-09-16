import { describe, expect, test } from '@jest/globals'
import request from 'supertest'
import app, { start, stop } from '../../app'
import { UserRole } from '../userDto'
import { User } from '../../entity/user'
import { AppDataSource } from '../../data-source'
import { createDatabase, dropDatabase } from 'typeorm-extension'

const userRepository = AppDataSource.getRepository(User)
let responseAccessTokenAdmin: any = undefined
let responseAccessTokenClient: any = undefined
let adminResponceDatabase: any = undefined
let workerResponceDatabase: any = undefined
let clientResponceDatabase: any = undefined

const createUserAdmin = {
    login: 'ADMIN',
    password: '$2b$05$R53OByi5tMBzx2DVGQjAKO/0YXk7RMXzyXg7mfW5Q7V/wssVUzTLO',
    role: UserRole.ADMIN,
    firstName: 'Admin',
    lastName: 'Admin',
    email: '123@mail.com',
    phoneNumber: '+392220000000',
    activated: true,
}

const updateUserAdmin = {
    login: 'ADMIN',
    password: 'ADMIN',
    firstName: 'Admin1111',
    lastName: 'Admin',
    email: '123@mail.com',
    phoneNumber: '+392220000000',
}

const updateUserAdminBadEmail = {
    login: 'ADMIN',
    password: 'ADMIN',
    firstName: 'Admin1111',
    lastName: 'Admin',
    email: 'Worker@mail.com',
    phoneNumber: '+392220000000',
}

const updateUserAdminBadLogin = {
    login: 'WORKER',
    password: 'ADMIN',
    firstName: 'Admin1111',
    lastName: 'Admin',
    email: '123@mail.com',
    phoneNumber: '+392220000000',
}

const createUserWorker = {
    login: 'WORKER',
    password: 'WORKER',
    role: UserRole.WORKER,
    firstName: 'Worker',
    lastName: 'Worker',
    email: 'Worker@mail.com',
    phoneNumber: '+399990000000',
}

const createUserWorkerBadData = {
    login: 'WORKER',
    password: '',
    role: UserRole.WORKER,
    firstName: 'Worker',
    lastName: 'Worker',
    email: 'Worker@mail.com',
    phoneNumber: '+399990000000',
}

const createUserClient = {
    login: 'Client',
    password: '$2b$05$R53OByi5tMBzx2DVGQjAKO/0YXk7RMXzyXg7mfW5Q7V/wssVUzTLO',
    role: UserRole.CLIENT,
    firstName: 'Client',
    lastName: 'Client',
    email: 'Client@mail.com',
    phoneNumber: '+394440000000',
    activationLink: '0db7afe9-3f9a-40ce-b8e3-9c9902a75b82',
}

const updateUserClient = {
    login: 'Client',
    password: 'ADMIN',
    firstName: 'Client1',
    lastName: 'Client',
    email: 'Client@mail.com',
    phoneNumber: '+394440000000',
}

const responseGetAllUsers = [
    {
        email: 'Client@mail.com',
        firstName: 'Client',
        id: expect.any(Number),
        lastName: 'Client',
        phoneNumber: '+394440000000',
    },
    {
        email: '123@mail.com',
        firstName: 'Admin',
        id: expect.any(Number),
        lastName: 'Admin',
        phoneNumber: '+392220000000',
    },
]

const responseGetUserById = {
    activated: false,
    email: 'Client@mail.com',
    firstName: 'Client',
    id: expect.any(Number),
    lastName: 'Client',
    phoneNumber: '+394440000000',
}
const responseGetMe = {
    activated: true,
    email: 'Client@mail.com',
    firstName: 'Client',
    id: expect.any(Number),
    lastName: 'Client',
    phoneNumber: '+394440000000',
}

const createTestDataBase = async () => {
    await createDatabase()
}

const dropTestDataBase = async () => {
    await dropDatabase()
}

describe('users controller', () => {
    beforeAll(async () => {
        await createTestDataBase()
        await start()
        await await userRepository.save(createUserAdmin)
        await await userRepository.save(createUserClient)
        clientResponceDatabase = await userRepository.findOneBy({
            login: createUserClient.login,
        })
    })

    afterAll(async () => {
        await userRepository.delete({ login: createUserAdmin.login })
        await stop()
        await dropTestDataBase()
    })
    test('loggin and get access token Admin', async () => {
        responseAccessTokenAdmin = await request(app)
            .post('/users/login')
            .send({
                login: 'ADMIN',
                password: 'ADMIN',
            } as any)
        expect(responseAccessTokenAdmin.body).toEqual({
            accessToken: expect.any(String),
        })
    })

    test('loggin and get error wrong login', async () => {
        const response = await request(app)
            .post('/users/login')
            .send({
                login: 'ADMIN1111',
                password: 'ADMIN',
            } as any)
        expect(response.body).toEqual({
            message: 'wrong login',
            name: 'WrongLogin',
            status: 400,
        })
    })

    test('loggin and get error wrong password', async () => {
        const response = await request(app)
            .post('/users/login')
            .send({
                login: 'ADMIN',
                password: 'ADMIN111',
            } as any)
        expect(response.body).toEqual({
            message: 'wrong password',
            name: 'WrongPassword',
            status: 400,
        })
    })

    test('loggin and get error wrong password', async () => {
        const response = await request(app)
            .post('/users/login')
            .send({
                login: 'Client',
                password: 'ADMIN',
            } as any)
        expect(response.body).toEqual({
            message: 'Activate your account',
            name: 'Activate your account',
            status: 400,
        })
    })

    test('get all users', async () => {
        const response = await request(app)
            .get('/users')
            .set('Authorization', responseAccessTokenAdmin.body.accessToken)
            .send()
        expect(response.body).toEqual(responseGetAllUsers)
    })

    test('get user by Id', async () => {
        const response = await request(app)
            .get(`/users/${clientResponceDatabase.id}`)
            .set('Authorization', responseAccessTokenAdmin.body.accessToken)
            .send()
        expect(response.body).toEqual(responseGetUserById)
    })

    test('get user by Id whith error user not found', async () => {
        const response = await request(app)
            .get(`/users/1000000`)
            .set('Authorization', responseAccessTokenAdmin.body.accessToken)
            .send()
        expect(response.status).toBe(400)
    })

    test('sign up by link whith Incorrect activation link', async () => {
        const response = await request(app)
            .get(`/users/signup-by-link/sad51544d5a454d5`)
            .send()
        expect(response.body).toEqual({
            message: 'Incorrect activation link',
            name: 'IncorrectActivationLink',
            status: 400,
        })
    })

    test('sign up by link', async () => {
        responseAccessTokenClient = await request(app)
            .get(`/users/signup-by-link/${createUserClient.activationLink}`)
            .send()
        expect(responseAccessTokenClient.body).toEqual({
            accessToken: expect.any(String),
        })
    })

    test('get me for client', async () => {
        const response = await request(app)
            .get(`/users/get/me`)
            .set('Authorization', responseAccessTokenClient.body.accessToken)
            .send()
        expect(response.body).toEqual(responseGetMe)
    })

    test('update me for client', async () => {
        responseAccessTokenClient = await request(app)
            .put(`/users/get/me`)
            .set('Authorization', responseAccessTokenClient.body.accessToken)
            .send(updateUserClient)
        expect(responseAccessTokenClient.body).toEqual({
            accessToken: expect.any(String),
        })
    })

    test('delete me for client', async () => {
        const response = await request(app)
            .delete(`/users/get/me`)
            .set('Authorization', responseAccessTokenClient.body.accessToken)
            .send()
        expect(response.status).toBe(204)
    })

    test('admin create user worker', async () => {
        const response = await request(app)
            .post(`/users`)
            .set('Authorization', responseAccessTokenAdmin.body.accessToken)
            .send(createUserWorker)
        expect(response.status).toBe(204)
    })

    test('update user by Id whith error User with this email already exist', async () => {
        adminResponceDatabase = await userRepository.findOneBy({
            login: createUserAdmin.login,
        })
        const response = await request(app)
            .put(`/users/${adminResponceDatabase.id}`)
            .set('Authorization', responseAccessTokenAdmin.body.accessToken)
            .send(updateUserAdminBadEmail)
        expect(response.body).toEqual({
            message: 'User with this email already exists',
            name: 'User With This Email Already Exists',
            status: 400,
        })
    })

    test('update user by Id whith error User with this login already exists', async () => {
        adminResponceDatabase = await userRepository.findOneBy({
            login: createUserAdmin.login,
        })
        const response = await request(app)
            .put(`/users/${adminResponceDatabase.id}`)
            .set('Authorization', responseAccessTokenAdmin.body.accessToken)
            .send(updateUserAdminBadLogin)
        expect(response.body).toEqual({
            message: 'User with this email already exists',
            name: 'User With This Email Already Exists',
            status: 400,
        })
    })

    test('admin create user worker whith error incorrect email or password', async () => {
        const response = await request(app)
            .post(`/users`)
            .set('Authorization', responseAccessTokenAdmin.body.accessToken)
            .send(createUserWorkerBadData)
        expect(response.body).toEqual({
            name: 'Incorrect Email Or Password',
            status: 400,
            message: 'Incorrect email or password',
        })
    })

    test('admin create user worker whith error User with this email already exists', async () => {
        const response = await request(app)
            .post(`/users`)
            .set('Authorization', responseAccessTokenAdmin.body.accessToken)
            .send(createUserWorker)
        expect(response.body).toEqual({
            message: 'User with this email already exists',
            name: 'User With This Email Already Exists',
            status: 400,
        })
    })

    test('delete worker by Id', async () => {
        workerResponceDatabase = await userRepository.findOneBy({
            login: createUserWorker.login,
        })
        const response = await request(app)
            .delete(`/users/${workerResponceDatabase.id}`)
            .set('Authorization', responseAccessTokenAdmin.body.accessToken)
            .send()
        expect(response.status).toBe(204)
    })

    test('update user by Id', async () => {
        adminResponceDatabase = await userRepository.findOneBy({
            login: createUserAdmin.login,
        })
        responseAccessTokenAdmin = await request(app)
            .put(`/users/${adminResponceDatabase.id}`)
            .set('Authorization', responseAccessTokenAdmin.body.accessToken)
            .send(updateUserAdmin)
        expect(responseAccessTokenAdmin.body).toEqual({
            accessToken: expect.any(String),
        })
    })

    test('logout user ', async () => {
        const response = await request(app)
            .put(`/users/logout`)
            .set('Authorization', responseAccessTokenAdmin.body.accessToken)
            .send()
        expect(response.status).toBe(422)
    })
})
