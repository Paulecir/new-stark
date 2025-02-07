import { Router } from "express"

import { authMiddleware } from "@/middlewares/authMiddleware"
import { expressRouteAdapter } from "@/presentations/adapters/expressRouterAdapter"
import { financialExtractController } from "@/presentations/controllers/financial/extract.controller"
import { resumeController } from "@/presentations/controllers/financial/resume.controller"
import { resumeOneController } from "@/presentations/controllers/financial/resumeOne.controller"
import { retiroApproveExtractController } from "@/presentations/controllers/financial/retiro-approve.controller"
import { financialExtractPendingController } from "@/presentations/controllers/financial/extract-pending.controller"
import { financialExtractBinaryController } from "@/presentations/controllers/financial/extract-binary.controller"
import { retiroRejectExtractController } from "@/presentations/controllers/financial/retiro-reject.controller"
import { retiroStatsController } from "@/presentations/controllers/financial/retiro-stats.controller"

const router = Router()

router.post("/extract",
  // #swagger.tags = ['Webhook']
  authMiddleware,
  expressRouteAdapter(financialExtractController)
)

router.post("/extract-pending",
  // #swagger.tags = ['Webhook']
  authMiddleware,
  expressRouteAdapter(financialExtractPendingController)
)

router.post("/extract-binary",
  // #swagger.tags = ['Webhook']
  authMiddleware,
  expressRouteAdapter(financialExtractBinaryController)
)

router.get("/resume",
  // #swagger.tags = ['Webhook']
  authMiddleware,
  expressRouteAdapter(resumeOneController)
)


router.post("/resume",
  // #swagger.tags = ['Webhook']
  authMiddleware,
  expressRouteAdapter(resumeController)
)

router.get("/retiro/stats",
  // #swagger.tags = ['Webhook']
  authMiddleware,
  expressRouteAdapter(retiroStatsController)
)

router.post("/retiro/approve",
  // #swagger.tags = ['Webhook']
  authMiddleware,
  expressRouteAdapter(retiroApproveExtractController)
)

router.post("/retiro/reject",
  // #swagger.tags = ['Webhook']
  authMiddleware,
  expressRouteAdapter(retiroRejectExtractController)
)


export default router;