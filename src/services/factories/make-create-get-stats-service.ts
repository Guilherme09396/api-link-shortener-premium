import { PrismaClickRepository } from '@/repositories/prisma/prisma-click-repository'
import { GetStats } from '../stats/get-stats'
import { PrismaLinkRepository } from '@/repositories/prisma/prisma-link-repository'

export function makeGetStatsService() {
  const linkRepository = new PrismaLinkRepository()
  const clickRepository = new PrismaClickRepository()
  return new GetStats(clickRepository, linkRepository)
}
