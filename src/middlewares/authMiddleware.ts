import { makeAuthMiddleware } from "@/factories/middlewares/authMiddlewareFactory"
import { expressMiddlewareAdapter } from "@/presentation/adapters/expressMiddlewareAdapter"

export const authMiddleware = expressMiddlewareAdapter(makeAuthMiddleware())
