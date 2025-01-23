import { Router } from "express"

import { authMiddleware } from "@/middlewares/authMiddleware"
import { expressRouteAdapter } from "@/presentations/adapters/expressRouterAdapter"
import { approveCommissionController } from "@/presentations/controllers/commissions/approve.controller"
import { createCommissionSchedulerController } from "@/presentations/controllers/commissions/create-scheduler.controller"
import { filterCommissionOrderItemsController } from "@/presentations/controllers/commissions/filter-order-items.controller"
import { filterCommissionOrdersPendingController } from "@/presentations/controllers/commissions/filter-order.controller"
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

router.post("/orders/pending",
  authMiddleware,
  expressRouteAdapter(filterCommissionOrdersPendingController)
)
router.post("/orders/items/:id",
  authMiddleware,
  expressRouteAdapter(filterCommissionOrderItemsController)
)

router.post("/approve",
  authMiddleware,
  expressRouteAdapter(approveCommissionController)
)

export default router;