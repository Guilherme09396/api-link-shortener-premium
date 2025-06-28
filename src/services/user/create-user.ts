import { UserRepository } from '@/repositories/user-repository'
import { hash } from 'bcryptjs'
import { Users } from 'generated/prisma'
import { AlreadyUserExistError } from '../errors/already-user-exist-error'

interface CreateUserRequest {
  name: string
  email: string
  password_hash: string
}
interface CreateUserResponse {
  user: Users
}

export class CreateUser {
  constructor(private userRepository: UserRepository) {}

  async execute(data: CreateUserRequest): Promise<CreateUserResponse> {
    const userExist = await this.userRepository.findByEmail(data.email)
    if (userExist) {
      throw new AlreadyUserExistError()
    }

    data.password_hash = await hash(data.password_hash, 6)

    const user = await this.userRepository.create(data)
    return { user }
  }
}
