import { Router } from "express"

import { expressRouteAdapter } from "@/presentations/adapters/expressRouterAdapter"
import { createProductController } from "@/presentations/controllers/products/create.controller"
import { authMiddleware } from "@/middlewares/authMiddleware"
import { filterProductController } from "@/presentations/controllers/products/filter.controller"
import { updateProductController } from "@/presentations/controllers/products/update.controller"
import { getProductController } from "@/presentations/controllers/products/get.controller"

const router = Router()

router.get("/",
  // #swagger.tags = ['Product']
  authMiddleware,
  expressRouteAdapter(filterProductController)
)

router.post("/",
  // #swagger.tags = ['Product']
  expressRouteAdapter(createProductController)
)

router.get("/{id}",
  // #swagger.tags = ['Product']
  authMiddleware,
  expressRouteAdapter(getProductController)
)

router.put("/{id}",
  // #swagger.tags = ['Product']
  authMiddleware,
  expressRouteAdapter(updateProductController)
)

export default router;