import { authMiddleware } from "@/middlewares/authMiddleware"
import { expressRouteAdapter } from "@/presentations/adapters/expressRouterAdapter"
import { changePasswordUserController } from "@/presentations/controllers/users/change-password.controller"
import { filterUserSessionsController } from "@/presentations/controllers/users/filter-sessions.controller"
import { filterUserController } from "@/presentations/controllers/users/filter.controller"
import { filterUserSelectController } from "@/presentations/controllers/users/filterSelect.controlle"
import { getDirectStatsController } from "@/presentations/controllers/users/get-direct-stats.controller"
import { getDirectController } from "@/presentations/controllers/users/get-direct.controller"
import { getUserController } from "@/presentations/controllers/users/get.controller"
import { resetPasswordUserController } from "@/presentations/controllers/users/reset-password.controller"
import { updateUserController } from "@/presentations/controllers/users/update.controller"
import { getDirectById } from "@/services/strategies/direct/getDirectById"
import { Router } from "express"


const router = Router()

router.get("/direct",
  // #swagger.tags = ['User']
  // #swagger.summary = 'Obter Diretos'
  // #swagger.description = 'Obtém os usuários diretos.'
  authMiddleware,
  expressRouteAdapter(getDirectController)
)

router.get("/direct/stats",
  // #swagger.tags = ['User']
  // #swagger.summary = 'Estatísticas de Diretos'
  // #swagger.description = 'Obtém estatísticas dos usuários diretos.'
  authMiddleware,
  expressRouteAdapter(getDirectStatsController)
)

router.get("/sessions",
  // #swagger.tags = ['User']
  // #swagger.summary = 'Filtrar Sessões'
  // #swagger.description = 'Filtra sessões de usuários.'
  authMiddleware,
  expressRouteAdapter(filterUserSessionsController)
)

router.get("/select",
  // #swagger.tags = ['User']
  // #swagger.summary = 'Selecionar Usuários'
  // #swagger.description = 'Seleciona usuários com base nos critérios fornecidos.'
  authMiddleware,
  expressRouteAdapter(filterUserSelectController)
)

router.get("/",
  // #swagger.tags = ['User']
  // #swagger.summary = 'Filtrar Usuários'
  // #swagger.description = 'Filtra usuários com base nos critérios fornecidos.'
  authMiddleware,
  expressRouteAdapter(filterUserController)
)


router.get("/:id",
  // #swagger.tags = ['User']
  // #swagger.summary = 'Obter Usuário'
  // #swagger.description = 'Obtém um usuário pelo ID.'
  authMiddleware,
  expressRouteAdapter(getUserController)
)

router.put("/:id",
  // #swagger.tags = ['User']
  // #swagger.summary = 'Atualizar Usuário'
  // #swagger.description = 'Atualiza um usuário pelo ID.'
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