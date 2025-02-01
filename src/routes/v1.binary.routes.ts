import { Router } from "express"

import { authMiddleware } from "@/middlewares/authMiddleware"
import { expressRouteAdapter } from "@/presentations/adapters/expressRouterAdapter"
import { getBinaryController } from "@/presentations/controllers/binary/get.controller"
import { updateBinaryController } from "@/presentations/controllers/binary/update.controller"

const router = Router()

router.get("/",
  // #swagger.tags = ['Webhook']
  authMiddleware,
  expressRouteAdapter(getBinaryController)
)

router.put("/",
  // #swagger.tags = ['Webhook']
  authMiddleware,
  expressRouteAdapter(updateBinaryController)
)


export default router;