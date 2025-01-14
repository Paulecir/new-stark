import { Router } from "express"

import { expressRouteAdapter } from "@/presentations/adapters/expressRouterAdapter"
import { createProductController } from "@/presentations/controllers/products/create.controller"
import { authMiddleware } from "@/middlewares/authMiddleware"
import { filterProductController } from "@/presentations/controllers/products/filter.controller"
import { updateProductController } from "@/presentations/controllers/products/update.controller"
import { getProductController } from "@/presentations/controllers/products/get.controller"

const router = Router()

router.get("/buy",
  // #swagger.tags = ['Order']
  authMiddleware,
  expressRouteAdapter((req, res) => {})
)

export default router;