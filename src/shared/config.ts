import * as dotenv from 'dotenv'
import convict from 'convict'

if (process.env.DOTENV_FILE) {
    dotenv.config({ path: process.env.DOTENV_FILE })
} else {
    dotenv.config()
}

const schema = {
    port: {
        format: Number,
        default: 3000,
        env: 'PORT',
    },
    db: {
        name: {
            format: String,
            default: 'carRepearStation',
            env: 'DB_NAME',
        },
        user: {
            format: String,
            default: 'postgres',
            env: 'DB_USER',
        },
        password: {
            format: String,
            default: 'root',
            env: 'DB_PASSWORD',
        },
        host: {
            format: String,
            default: 'localhost',
            env: 'DB_HOST',
        },
        port: {
            format: Number,
            default: 5432,
            env: 'DB_PORT',
        },
    },
    token: {
        secretKey: {
            format: String,
            default: 'secret KEY',
            env: 'SECRET_KEY',
        },
        life: {
            format: String,
            default: '12h',
            env: 'TOKEN_LIFE',
        },
    },
    saltRounds: {
        format: Number,
        default: 10,
        env: 'SALT_ROUNDS',
    },
    smtp: {
        host: {
            format: String,
            default: 'smtp.ukr.net',
            env: 'SMTP_HOST',
        },
        port: {
            format: Number,
            default: 465,
            env: 'SMTP_PORT',
        },
        user: {
            format: String,
            default: ' ',
            env: 'SMTP_USER',
        },
        password: {
            format: String,
            default: ' ',
            env: 'SMTP_PASSWORD',
        },
    },
    apiURL: {
        format: String,
        default: 'http://localhost:3000',
        env: 'API_URL',
    },
}

const config = convict(schema)
config.validate({ allowed: 'strict' })

export default config
