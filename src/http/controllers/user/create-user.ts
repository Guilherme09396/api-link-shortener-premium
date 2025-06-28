import { createUserSchema } from '@/repositories/schemas/create-user-schema'
import { AlreadyUserExistError } from '@/services/errors/already-user-exist-error'
import { makeCreateUserService } from '@/services/factories/make-create-user-service'
import { Request, Response } from 'express'

export async function createUser(req: Request, res: Response) {
  try {
    const data = createUserSchema.parse(req.body)
    const createUserService = makeCreateUserService()
    const { user } = await createUserService.execute(data)
    res.status(201).json({ user })
  } catch (e) {
    if (e instanceof AlreadyUserExistError) {
      res.status(409).json({ error: e.message })
    } else {
      throw e
    }
  }
}
