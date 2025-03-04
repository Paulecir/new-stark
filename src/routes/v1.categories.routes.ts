import { Router } from "express"

import { expressRouteAdapter } from "@/presentations/adapters/expressRouterAdapter"
import { createCategoryController } from "@/presentations/controllers/categories/create.controller"
import { authMiddleware } from "@/middlewares/authMiddleware"
import { filterCategoryController } from "@/presentations/controllers/categories/filter.controller"
import { updateCategoryController } from "@/presentations/controllers/categories/update.controller"
import { getCategoryController } from "@/presentations/controllers/categories/get.controller"
import { selectCategoryController } from "@/presentations/controllers/categories/select.controller"

const router = Router()

router.get("/",
  // #swagger.tags = ['Category']
  authMiddleware,
  expressRouteAdapter(filterCategoryController)
)

router.get("/select",
  // #swagger.tags = ['Category']
  authMiddleware,
  expressRouteAdapter(selectCategoryController)
)

router.post("/create",
  expressRouteAdapter(createCategoryController)
)

router.get("/:id",
  // #swagger.tags = ['Category']
  authMiddleware,
  expressRouteAdapter(getCategoryController)
)

router.put("/:id",
  // #swagger.tags = ['Category']
  authMiddleware,
  expressRouteAdapter(updateCategoryController)
)

export default router;