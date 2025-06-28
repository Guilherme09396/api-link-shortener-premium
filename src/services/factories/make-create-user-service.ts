import { PrismaUserRepository } from '@/repositories/prisma/prisma-user-repository'
import { CreateUser } from '../user/create-user'

export function makeCreateUserService() {
  const userRepository = new PrismaUserRepository()
  return new CreateUser(userRepository)
}
