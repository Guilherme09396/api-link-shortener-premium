import { Prisma, Users } from 'generated/prisma'
import { prisma } from '@/lib/prisma'
import { UserRepository } from '../user-repository'

export class PrismaLinkRepository implements UserRepository {
  async create(data: Prisma.UsersCreateInput): Promise<Users> {
    const user = await prisma.users.create({
      data,
    })
    return user
  }

  async findByEmail(email: string): Promise<Users | null> {
    const user = await prisma.users.findUnique({ where: { email } })
    return user
  }
}
