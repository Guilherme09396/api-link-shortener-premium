import { Links } from 'generated/prisma'
import { LinkRepository } from '../link-repository'
import { randomUUID } from 'node:crypto'

export class InMemoryLinkRepository implements LinkRepository {
  private db: Links[] = []

  async create(data: Links): Promise<Links> {
    this.db.push({ ...data, id: randomUUID() })
    return this.db[this.db.length - 1]
  }
}
