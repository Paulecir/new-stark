import { Router } from "express"

import { authMiddleware } from "@/middlewares/authMiddleware"
import { expressRouteAdapter } from "@/presentations/adapters/expressRouterAdapter"
import { buyOrderController } from "@/presentations/controllers/orders/buy.controller"
import { approveOrderController } from "@/presentations/controllers/orders/approve.controller"

const router = Router()

router.post("/buy",
  // #swagger.tags = ['Order']
  authMiddleware,
  expressRouteAdapter(buyOrderController)
)

router.post("/approve",
  // #swagger.tags = ['Order']
  authMiddleware,
  expressRouteAdapter(approveOrderController)
)

export default router;