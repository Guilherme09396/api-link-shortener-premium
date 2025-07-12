import { UserRepository } from '@/repositories/user-repository'
import { compare } from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { CredentialsInvalidError } from '../errors/credentials-invalid-error'
import { env } from '@/env'

interface LoginUserRequest {
  email: string
  password_hash: string
}
interface LoginUserResponse {
  token: string
}

export class LoginUser {
  constructor(private userRepository: UserRepository) {}

  async execute({
    email,
    password_hash,
  }: LoginUserRequest): Promise<LoginUserResponse> {
    const user = await this.userRepository.findByEmail(email)

    if (!user) {
      throw new CredentialsInvalidError()
    }

    const passwordIsCorrect = await compare(password_hash, user.password_hash)
    if (!passwordIsCorrect) {
      throw new CredentialsInvalidError()
    }

    const token = jwt.sign({id: user.id}, env.JWT_SECRET, {
      expiresIn: '6h'
    })
    return { token }
  }
}
