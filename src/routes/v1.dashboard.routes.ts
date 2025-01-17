import { Router } from "express"

import { authMiddleware } from "@/middlewares/authMiddleware"
import { expressRouteAdapter } from "@/presentations/adapters/expressRouterAdapter"
import { financialExtractController } from "@/presentations/controllers/financial/extract.controller"
import { dashboardBinaryResumeController } from "@/presentations/controllers/dashboard/binary-resume.controller"

const router = Router()

router.get("/binary/resume",
  // #swagger.tags = ['Webhook']
  authMiddleware,
  expressRouteAdapter(dashboardBinaryResumeController)
)




export default router;