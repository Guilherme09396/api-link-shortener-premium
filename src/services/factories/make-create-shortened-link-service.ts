import { CreateShortenedLink } from '../link/create-shortened-link'

export function makeCreateShortenedLinkService() {
  return new CreateShortenedLink()
}
