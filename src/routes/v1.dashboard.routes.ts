import { Router } from "express"

import { authMiddleware } from "@/middlewares/authMiddleware"
import { expressRouteAdapter } from "@/presentations/adapters/expressRouterAdapter"
import { dashboardBinaryResumeController } from "@/presentations/controllers/dashboard/binary-resume.controller"
import { dashboardUserStatsListController } from "@/presentations/controllers/dashboard/user-stats-list.controller"
import { dashboardUserStatsController } from "@/presentations/controllers/dashboard/user-stats.controller"

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




export default router;