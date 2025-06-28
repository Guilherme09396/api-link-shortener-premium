import { Prisma, Users } from 'generated/prisma'

export interface UserRepository {
  create(data: Prisma.UsersCreateInput): Promise<Users>
  findByEmail(email: string): Promise<Users | null>
}
