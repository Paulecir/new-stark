import { authMiddleware } from "@/middlewares/authMiddleware"
import { expressRouteAdapter } from "@/presentations/adapters/expressRouterAdapter"
import { changePasswordUserController } from "@/presentations/controllers/users/change-password.controller"
import { filterUserController } from "@/presentations/controllers/users/filter.controller"
import { getDirectController } from "@/presentations/controllers/users/get-direct.controller"
import { getUserController } from "@/presentations/controllers/users/get.controller"
import { resetPasswordUserController } from "@/presentations/controllers/users/reset-password.controller"
import { updateUserController } from "@/presentations/controllers/users/update.controller"
import { getDirectById } from "@/services/strategies/direct/getDirectById"
import { Router } from "express"


const router = Router()

router.get("/direct",
  authMiddleware,
  expressRouteAdapter(getDirectController)
)

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

router.post("/send-email-reset-password",
  expressRouteAdapter(resetPasswordUserController)
)

router.post("/reset-password",
  expressRouteAdapter(changePasswordUserController)
)

export default router;