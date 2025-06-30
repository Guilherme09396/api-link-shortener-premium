import { PrismaClickRepository } from '@/repositories/prisma/prisma-click-repository'
import { CreateClick } from '../click-on-link/create-click'

export function makeCreateClickService() {
  const clickRepository = new PrismaClickRepository()
  return new CreateClick(clickRepository)
}
