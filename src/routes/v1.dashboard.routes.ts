import { Router } from "express"

import { authMiddleware } from "@/middlewares/authMiddleware"
import { expressRouteAdapter } from "@/presentations/adapters/expressRouterAdapter"
import { dashboardAdminStatsController } from "@/presentations/controllers/dashboard/admin-stats.controller copy"
import { dashboardBinaryResumeController } from "@/presentations/controllers/dashboard/binary-resume.controller"
import { dashboardUserStatsListController } from "@/presentations/controllers/dashboard/user-stats-list.controller"
import { dashboardUserStatsController } from "@/presentations/controllers/dashboard/user-stats.controller"
import { dashboardProductStatsController } from "@/presentations/controllers/dashboard/product-stats.controller"
import { dashboardAdminVendasStatsController } from "@/presentations/controllers/dashboard/admin-vendas-stats.controller"
import { dashboardAdminCommissionsStatsController } from "@/presentations/controllers/dashboard/admin-commissions-stats.controller"
import { dashboardAdminRankingController } from "@/presentations/controllers/dashboard/admin-ranking.controller"

const router = Router()

router.get("/binary/resume",
  // #swagger.tags = ['Webhook']
  authMiddleware,
  expressRouteAdapter(dashboardBinaryResumeController)
)
router.get("/users/stats",
  // #swagger.tags = ['Webhook']
  authMiddleware,
  expressRouteAdapter(dashboardUserStatsController)
)
router.get("/users/stats/list",
  // #swagger.tags = ['Webhook']
  authMiddleware,
  expressRouteAdapter(dashboardUserStatsListController)
)

router.get("/products/stats",
  authMiddleware,
  expressRouteAdapter(dashboardProductStatsController)
)

router.get("/admin/stats",
  authMiddleware,
  expressRouteAdapter(dashboardAdminStatsController)
)

router.get("/admin/vendas/stats",
  authMiddleware,
  expressRouteAdapter(dashboardAdminVendasStatsController)
)

router.get("/admin/commissions/stats",
  authMiddleware,
  expressRouteAdapter(dashboardAdminCommissionsStatsController)
)

router.get("/admin/ranking",
  authMiddleware,
  expressRouteAdapter(dashboardAdminRankingController)
)


export default router;