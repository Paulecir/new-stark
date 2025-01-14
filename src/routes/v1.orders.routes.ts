import { Router } from "express"

import { authMiddleware } from "@/middlewares/authMiddleware"
import { expressRouteAdapter } from "@/presentations/adapters/expressRouterAdapter"
import { buyOrderController } from "@/presentations/controllers/orders/buy.controller"

const router = Router()

router.get("/buy",
  // #swagger.tags = ['Order']
  authMiddleware,
  expressRouteAdapter(buyOrderController)
)

export default router;