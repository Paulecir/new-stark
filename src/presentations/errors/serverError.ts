export class ServerError extends Error {
    constructor(stack: string, private readonly error?: any) {
      super(error.message || "Internal Server Error")
      this.name = error?.name || "ServerError"
      this.stack = stack
      if (error) {
        Object.keys(error).forEach((f) => {
          this[f] = error[f]
        })
      }
    }
  }
  