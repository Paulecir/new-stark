import { Router } from "express"

import { authMiddleware } from "@/middlewares/authMiddleware"
import { expressRouteAdapter } from "@/presentations/adapters/expressRouterAdapter"
import { getBinaryController } from "@/presentations/controllers/binary/get.controller"

const router = Router()

router.get("/:id",
  // #swagger.tags = ['Webhook']
  authMiddleware,
  expressRouteAdapter(getBinaryController)
)



export default router;