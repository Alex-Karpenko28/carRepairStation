import { describe, expect, test, jest } from '@jest/globals'
import { UserRole } from '../userDto'
import { UsersService } from '../usersService'

jest.mock('../../shared/mail-servise')

const databaseUserRecord = {
    id: 1,
    login: 'ADMIN',
    password: '$2b$05$R53OByi5tMBzx2DVGQjAKO/0YXk7RMXzyXg7mfW5Q7V/wssVUzTLO',
    role: 'admin',
    firstName: 'Admin',
    lastName: 'Admin',
    email: '123@mail.com',
    tokenSalt: 263981,
    activationLink: 'null',
    activated: true,
    phoneNumber: '+392220000000',
    createdAt: '2022-08-16T08:22:03.084Z',
    updatedAt: '2022-09-09T07:49:07.694Z',
}

const databaseUserRecordUnactivated = {
    id: 1,
    login: 'ADMIN',
    password: '$2b$05$R53OByi5tMBzx2DVGQjAKO/0YXk7RMXzyXg7mfW5Q7V/wssVUzTLO',
    role: 'admin',
    firstName: 'Admin',
    lastName: 'Admin',
    email: '123@mail.com',
    tokenSalt: 263981,
    activationLink: 'null',
    activated: false,
    phoneNumber: '+392220000000',
    createdAt: '2022-08-16T08:22:03.084Z',
    updatedAt: '2022-09-09T07:49:07.694Z',
}

const serviceUserResponse = {
    id: 1,
    firstName: 'Admin',
    lastName: 'Admin',
    email: '123@mail.com',
    phoneNumber: '+392220000000',
    activated: true,
}

const userLogin = {
    login: 'ADMIN',
    password: 'ADMIN',
}

const userLoginFalsePassword = {
    login: 'ADMIN',
    password: 'ADMIN111',
}

const createUser = {
    login: 'ADMIN',
    password: 'ADMIN',
    role: UserRole.ADMIN,
    firstName: 'Admin',
    lastName: 'Admin',
    email: '123@mail.com',
    phoneNumber: '+392220000000',
}

const createUserBadPassword = {
    login: 'ADMIN',
    password: '',
    role: UserRole.ADMIN,
    firstName: 'Admin',
    lastName: 'Admin',
    email: '123@mail.com',
    phoneNumber: '+392220000000',
}

const updateUser = {
    login: 'ADMIN',
    password: 'ADMIN',
    firstName: 'Admin',
    lastName: 'Admin',
    email: '123@mail.com',
    phoneNumber: '+392220000000',
}

const updateUserEmailError = {
    login: 'ADMIN',
    password: 'ADMIN',
    firstName: 'Admin',
    lastName: 'Admin',
    email: '1231@mail.com',
    phoneNumber: '+392220000000',
}

const databaseAllUsersResponce = [
    {
        id: 3,
        firstName: 'Worker',
        lastName: 'Worker',
        email: '345@mail.com',
        phoneNumber: '+39222111111',
    },
    {
        id: 1,
        firstName: 'Admin',
        lastName: 'Admin',
        email: '123@mail.com',
        phoneNumber: '+392220000000',
    },
    {
        id: 21,
        firstName: 'Client22222',
        lastName: 'ClientCCCC',
        email: 'Client@mail.com',
        phoneNumber: '+38080465556565',
    },
]

describe('userService', () => {
    test('get concrete user by id', async () => {
        // arrange
        const userRepositoryMock: any = {
            findOneBy: jest.fn().mockResolvedValue(databaseUserRecord as never),
        }
        const instance = new UsersService(userRepositoryMock)
        // action

        const response = await instance.get(1)
        // assertion

        expect(response).toEqual(serviceUserResponse)
    })

    test('login user', async () => {
        const userRepositoryMock: any = {
            findOneBy: jest.fn().mockResolvedValue(databaseUserRecord as never),
            update: jest.fn().mockReturnValue('UPDATE 1'),
        }

        const instance = new UsersService(userRepositoryMock)

        const response = await instance.post(userLogin)

        expect(response).toEqual(
            expect.objectContaining({
                accessToken: expect.any(String),
            })
        )
    })

    test('create new user', async () => {
        const userRepositoryMock: any = {
            findOneBy: jest.fn().mockResolvedValue(null as never),
            save: jest.fn().mockResolvedValue(null as never),
        }

        const instance = new UsersService(userRepositoryMock)

        const response = await instance.createNewUser(createUser)

        expect(userRepositoryMock.save).toHaveBeenCalledWith({
            activationLink: expect.any(String),
            email: '123@mail.com',
            firstName: 'Admin',
            lastName: 'Admin',
            login: 'ADMIN',
            password: expect.any(String),
            phoneNumber: '+392220000000',
            role: 'admin',
            tokenSalt: expect.any(Number),
        })
    })

    test('update user', async () => {
        const userRepositoryMock: any = {
            findOneBy: jest.fn().mockResolvedValue(databaseUserRecord as never),
            update: jest.fn().mockReturnValue,
        }

        const instance = new UsersService(userRepositoryMock)

        const response = await instance.updateUser(updateUser, 1)

        expect(response).toEqual(
            expect.objectContaining({
                accessToken: expect.any(String),
            })
        )
    })

    test('get all users', async () => {
        const userRepositoryMock: any = {
            find: jest
                .fn()
                .mockResolvedValue(databaseAllUsersResponce as never),
        }

        const instance = new UsersService(userRepositoryMock)

        const response = await instance.getAllUsers()

        expect(response).toEqual(databaseAllUsersResponce)
    })

    test('logout', async () => {
        const userRepositoryMock: any = {
            update: jest.fn().mockResolvedValue(null as never),
        }

        const instance = new UsersService(userRepositoryMock)

        const response = await instance.logout(1)

        expect(userRepositoryMock.update).toHaveBeenCalledWith(1, {
            tokenSalt: -1,
        })
    })

    test('delete user', async () => {
        const userRepositoryMock: any = {
            delete: jest.fn().mockResolvedValue(null as never),
        }

        const instance = new UsersService(userRepositoryMock)

        const response = await instance.deleteUser(1)

        expect(userRepositoryMock.delete).toHaveBeenCalledWith(1)
    })

    test('sign up by link', async () => {
        const userRepositoryMock: any = {
            findOneBy: jest.fn().mockResolvedValue(databaseUserRecord as never),
            update: jest.fn().mockReturnValue,
        }

        const instance = new UsersService(userRepositoryMock)

        const response = await instance.updateUser(updateUser, 1)

        expect(response).toEqual(
            expect.objectContaining({
                accessToken: expect.any(String),
            })
        )
    })

    test('get concrete user by id with error message "user not found"', async () => {
        const userRepositoryMock: any = {
            findOneBy: jest.fn().mockResolvedValue(null as never),
        }

        const instance = new UsersService(userRepositoryMock)

        await expect(instance.get(1)).rejects.toThrow('user not found')
    })

    test('login user with error message "wrong login"', async () => {
        const userRepositoryMock: any = {
            findOneBy: jest.fn().mockResolvedValueOnce(null as never),
        }

        const instance = new UsersService(userRepositoryMock)

        await expect(instance.post(userLogin)).rejects.toThrow('wrong login')
    })

    test('login user with error message "Activate your account"', async () => {
        const userRepositoryMock: any = {
            findOneBy: jest
                .fn()
                .mockResolvedValueOnce(databaseUserRecordUnactivated as never),
        }

        const instance = new UsersService(userRepositoryMock)

        await expect(instance.post(userLogin)).rejects.toThrow(
            'Activate your account'
        )
    })

    test('login user with error message "wrong password"', async () => {
        const userRepositoryMock: any = {
            findOneBy: jest
                .fn()
                .mockResolvedValueOnce(databaseUserRecord as never),
        }

        const instance = new UsersService(userRepositoryMock)

        await expect(instance.post(userLoginFalsePassword)).rejects.toThrow(
            'wrong password'
        )
    })

    test('create new user with error message "Incorrect email or password"', async () => {
        const instance = new UsersService()

        await expect(
            instance.createNewUser(createUserBadPassword)
        ).rejects.toThrow('Incorrect email or password')
    })

    test('create new user with error message "User with this email already exists"', async () => {
        const userRepositoryMock: any = {
            findOneBy: jest
                .fn()
                .mockResolvedValueOnce(databaseUserRecord as never),
        }

        const instance = new UsersService(userRepositoryMock)

        await expect(instance.createNewUser(createUser)).rejects.toThrow(
            'User with this email already exists'
        )
    })

    test('update user with error message "User with this email already exists"', async () => {
        const userRepositoryMock: any = {
            findOneBy: jest
                .fn()
                .mockResolvedValueOnce(databaseUserRecord as never)
                .mockResolvedValueOnce(databaseUserRecord as never),
        }

        const instance = new UsersService(userRepositoryMock)

        await expect(
            instance.updateUser(updateUserEmailError, 1)
        ).rejects.toThrow('User with this email already exists')
    })

    test('update user with error message "User with this login already exists"', async () => {
        const userRepositoryMock: any = {
            findOneBy: jest
                .fn()
                .mockResolvedValueOnce(databaseUserRecord as never)
                .mockResolvedValueOnce(null as never)
                .mockResolvedValueOnce(databaseUserRecord as never),
        }

        const instance = new UsersService(userRepositoryMock)

        await expect(
            instance.updateUser(updateUserEmailError, 1)
        ).rejects.toThrow('User with this login already exists')
    })

    test('sign up by link with error messag "Incorrect activation link"', async () => {
        const userRepositoryMock: any = {
            findOneBy: jest.fn().mockResolvedValue(null as never),
        }

        const instance = new UsersService(userRepositoryMock)
        await expect(instance.sign_UpByLink('link')).rejects.toThrow(
            'Incorrect activation link'
        )
    })
})
