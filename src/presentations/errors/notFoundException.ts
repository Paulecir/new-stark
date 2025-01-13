export class NotFoundError extends Error {
    constructor(message: string) {
      super(message || "Internal Server Error")
    }
  }
  