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
  // #swagger.summary = 'Filtrar Wallets'
  // #swagger.description = 'Filtra wallets com base nos critérios fornecidos.'
  authMiddleware,
  expressRouteAdapter(filterWalletController)
)

router.post("/create",
  // #swagger.tags = ['Wallet']
  // #swagger.summary = 'Criar Wallet'
  // #swagger.description = 'Cria uma nova wallet.'
  expressRouteAdapter(createWalletController)
)

router.get("/:id",
  // #swagger.tags = ['Wallet']
  // #swagger.summary = 'Obter Wallet'
  // #swagger.description = 'Obtém uma wallet pelo ID.'
  authMiddleware,
  expressRouteAdapter(getWalletController)
)

router.put("/:id",
  // #swagger.tags = ['Wallet']
  // #swagger.summary = 'Atualizar Wallet'
  // #swagger.description = 'Atualiza uma wallet pelo ID.'
  authMiddleware,
  expressRouteAdapter(updateWalletController)
)

export default router;