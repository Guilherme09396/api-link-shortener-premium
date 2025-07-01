import { loginUserSchema } from '@/repositories/schemas/login-user-schema'
import { CredentialsInvalidError } from '@/services/errors/credentials-invalid-error'
import { makeLoginUserService } from '@/services/factories/make-login-user-service'
import { Request, Response } from 'express'

export async function loginUser(req: Request, res: Response) {
  try {
    const { email, password_hash } = loginUserSchema.parse(req.body)
    const loginUserService = makeLoginUserService()
    const { token } = await loginUserService.execute({ email, password_hash })
    res.status(200).json({ token })
  } catch (e) {
    if (e instanceof CredentialsInvalidError) {
      res.status(401).json({ error: e.message })
    } else {
      throw e
    }
  }
}
