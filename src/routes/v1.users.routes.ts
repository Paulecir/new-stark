import { authMiddleware } from "@/middlewares/authMiddleware"
import { expressRouteAdapter } from "@/presentations/adapters/expressRouterAdapter"
import { filterUserController } from "@/presentations/controllers/users/filter.controller"
import { getUserController } from "@/presentations/controllers/users/get.controller"
import { updateUserController } from "@/presentations/controllers/users/update.controller"
import { Router } from "express"


const router = Router()

router.get("/",
  // #swagger.tags = ['User']
  authMiddleware,
  expressRouteAdapter(filterUserController)
)

router.get("/:id",
  // #swagger.tags = ['User']
  authMiddleware,
  expressRouteAdapter(getUserController)
)

router.put("/:id",
  // #swagger.tags = ['User']
  authMiddleware,
  expressRouteAdapter(updateUserController)
)

export default router;