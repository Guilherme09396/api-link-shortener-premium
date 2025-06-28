export class AlreadyUserExistError extends Error {
  constructor() {
    super('Already user exist.')
  }
}
