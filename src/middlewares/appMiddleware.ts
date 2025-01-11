import { makeAppMiddleware } from "@/factories/middlewares/appMiddlewareFactory"
import { expressMiddlewareAdapter } from "@/presentation/adapters/expressMiddlewareAdapter"

export const appMiddleware = expressMiddlewareAdapter(makeAppMiddleware())
