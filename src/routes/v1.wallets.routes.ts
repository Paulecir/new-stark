import { Router } from "express"

import { expressRouteAdapter } from "@/presentations/adapters/expressRouterAdapter"
import { createWalletController } from "@/presentations/controllers/wallets/create.controller"
import { authMiddleware } from "@/middlewares/authMiddleware"
import { filterWalletController } from "@/presentations/controllers/wallets/filter.controller"
import { updateWalletController } from "@/presentations/controllers/wallets/update.controller"
import { getWalletController } from "@/presentations/controllers/wallets/get.controller"

const router = Router()

router.get("/",
  // #swagger.tags = ['Wallet']
  authMiddleware,
  expressRouteAdapter(filterWalletController)
)

router.post("/create",
  // #swagger.tags = ['Wallet']
  expressRouteAdapter(createWalletController)
)

router.get("/:id",
  // #swagger.tags = ['Wallet']
  authMiddleware,
  expressRouteAdapter(getWalletController)
)

router.put("/:id",
  // #swagger.tags = ['Wallet']
  authMiddleware,
  expressRouteAdapter(updateWalletController)
)

export default router;