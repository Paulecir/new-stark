import { Router } from "express"

import { authMiddleware } from "@/middlewares/authMiddleware"
import { expressRouteAdapter } from "@/presentations/adapters/expressRouterAdapter"
import { createCommissionSchedulerController } from "@/presentations/controllers/commissions/create-scheduler.controller"
import { filterCommissionsSchedulerController } from "@/presentations/controllers/commissions/filter-scheduler.controller"
import { getCommissionsSchedulerController } from "@/presentations/controllers/commissions/get-scheduler.controller"
import { updateCommissionSchedulerController } from "@/presentations/controllers/commissions/update-scheduler.controller"

const router = Router()

router.get("/scheduler/:id",
  // #swagger.tags = ['Webhook']
  authMiddleware,
  expressRouteAdapter(getCommissionsSchedulerController)
)

router.put("/scheduler/:id",
  // #swagger.tags = ['Webhook']
  authMiddleware,
  expressRouteAdapter(updateCommissionSchedulerController)
)

router.get("/scheduler",
  // #swagger.tags = ['Webhook']
  authMiddleware,
  expressRouteAdapter(filterCommissionsSchedulerController)
)

router.post("/scheduler",
  authMiddleware,
  expressRouteAdapter(createCommissionSchedulerController)
)

export default router;