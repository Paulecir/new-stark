import { Router } from "express"

import { expressRouteAdapter } from "@/presentations/adapters/expressRouterAdapter"
import { createWithdrawController } from "@/presentations/controllers/withdraws/create.controller"
import { authMiddleware } from "@/middlewares/authMiddleware"
import { filterWithdrawController } from "@/presentations/controllers/withdraws/filter.controller"
import { updateWithdrawController } from "@/presentations/controllers/withdraws/update.controller"
import { getWithdrawController } from "@/presentations/controllers/withdraws/get.controller"

const router = Router()

router.get("/",
  // #swagger.tags = ['Withdraw']
  authMiddleware,
  expressRouteAdapter(filterWithdrawController)
)

router.post("/create",
  // #swagger.tags = ['Withdraw']
  authMiddleware,
  expressRouteAdapter(createWithdrawController)
)

router.get("/:id",
  // #swagger.tags = ['Withdraw']
  authMiddleware,
  expressRouteAdapter(getWithdrawController)
)

router.put("/:id",
  // #swagger.tags = ['Withdraw']
  authMiddleware,
  expressRouteAdapter(updateWithdrawController)
)

export default router;