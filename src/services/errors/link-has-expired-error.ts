export class LinkHasExpiredError extends Error {
  constructor() {
    super('Link has expired.')
  }
}
