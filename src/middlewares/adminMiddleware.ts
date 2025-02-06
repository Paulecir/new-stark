// import { makeAuthMiddleware } from "@/factories/middlewares/authMiddlewareFactory"
// import { expressMiddlewareAdapter } from "@/presentation/adapters/expressMiddlewareAdapter"

import { expressMiddlewareAdapter } from "@/presentations/adapters/expressMiddlewareAdapter";
import { makeAdminMiddleware } from "@/presentations/middleware/adminMiddleware";

export const adminMiddleware = expressMiddlewareAdapter(makeAdminMiddleware)
