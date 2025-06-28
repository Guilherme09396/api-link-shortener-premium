export class AlreadySlugExistError extends Error {
  constructor() {
    super('Already slug exist.')
  }
}
