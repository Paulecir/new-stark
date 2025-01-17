import { Router } from "express"

import { authMiddleware } from "@/middlewares/authMiddleware"
import { expressRouteAdapter } from "@/presentations/adapters/expressRouterAdapter"
import { financialExtractController } from "@/presentations/controllers/financial/extract.controller"
import { resumeController } from "@/presentations/controllers/financial/resume.controller"

const router = Router()

router.post("/extract",
  // #swagger.tags = ['Webhook']
  authMiddleware,
  expressRouteAdapter(financialExtractController)
)
router.post("/resume",
  // #swagger.tags = ['Webhook']
  authMiddleware,
  expressRouteAdapter(resumeController)
)



export default router;