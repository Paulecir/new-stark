export class NotAuthorizedError extends Error {
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
  

  export class NotAuthError extends Error {
    constructor( private readonly error?: any) {
      super(error.message || "Internal Server Error")
      this.name = error?.name || error?.message || "ServerError"
      this.error = undefined
      if (error) {
        Object.keys(error).forEach((f) => {
          this[f] = error[f]
        })
      }
    }
  }
  