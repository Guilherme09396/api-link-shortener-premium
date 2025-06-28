// types/express/index.d.ts (ou em qualquer lugar, desde que esteja no escopo do projeto)
import * as express from 'express'

declare global {
  namespace Express {
    interface Request {
      numberAccess?: number
      userLogged?: boolean
      userId?: string
    }
  }
}
