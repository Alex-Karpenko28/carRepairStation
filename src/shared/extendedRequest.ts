import type * as express from 'express'

export type ExtendedRequest = express.Request & {
    context: { userId: number }
}
