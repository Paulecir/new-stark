// import { makeAuthMiddleware } from "@/factories/middlewares/authMiddlewareFactory"
// import { expressMiddlewareAdapter } from "@/presentation/adapters/expressMiddlewareAdapter"

import { expressMiddlewareAdapter } from "@/presentations/adapters/expressMiddlewareAdapter";
import { makeAuthMiddleware } from "@/presentations/middleware/authMiddleware";

export const authMiddleware = expressMiddlewareAdapter(makeAuthMiddleware)
