import { Router } from "express"

import { expressRouteAdapter } from "@/presentations/adapters/expressRouterAdapter"
import { createWithdrawController } from "@/presentations/controllers/withdraws/create.controller"
import { authMiddleware } from "@/middlewares/authMiddleware"
import { filterWithdrawController } from "@/presentations/controllers/withdraws/filter.controller"
import { updateWithdrawController } from "@/presentations/controllers/withdraws/update.controller"
import { getWithdrawController } from "@/presentations/controllers/withdraws/get.controller"

const router = Router()

router.get("/:previleges",
  // #swagger.tags = ['Withdraw']
  // #swagger.summary = 'Filtrar Withdraws'
  // #swagger.description = 'Filtra withdraws com base nos privilégios fornecidos.'
  authMiddleware,
  expressRouteAdapter(filterWithdrawController)
)

router.post("/create",
  // #swagger.tags = ['Withdraw']
  // #swagger.summary = 'Criar Withdraw'
  // #swagger.description = 'Cria um novo withdraw.'
  authMiddleware,
  expressRouteAdapter(createWithdrawController)
)

router.get("/:id",
  // #swagger.tags = ['Withdraw']
  // #swagger.summary = 'Obter Withdraw'
  // #swagger.description = 'Obtém um withdraw pelo ID.'
  authMiddleware,
  expressRouteAdapter(getWithdrawController)
)

router.put("/:id",
  // #swagger.tags = ['Withdraw']
  // #swagger.summary = 'Atualizar Withdraw'
  // #swagger.description = 'Atualiza um withdraw pelo ID.'
  authMiddleware,
  expressRouteAdapter(updateWithdrawController)
)

export default router;