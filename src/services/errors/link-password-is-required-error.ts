export class LinkPasswordIsRequiredError extends Error {
  constructor() {
    super('The link password is required.')
  }
}
