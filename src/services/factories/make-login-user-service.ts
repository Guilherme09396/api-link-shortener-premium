import { PrismaUserRepository } from '@/repositories/prisma/prisma-user-repository'
import { LoginUser } from '../user/login-user'

export function makeLoginUserService() {
  const userRepository = new PrismaUserRepository()
  return new LoginUser(userRepository)
}
