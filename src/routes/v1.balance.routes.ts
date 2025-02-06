import { Router } from "express"

import { authMiddleware } from "@/middlewares/authMiddleware"
import { expressRouteAdapter } from "@/presentations/adapters/expressRouterAdapter"
import { financialExtractController } from "@/presentations/controllers/financial/extract.controller"
import { resumeController } from "@/presentations/controllers/financial/resume.controller"
import { resumeOneController } from "@/presentations/controllers/financial/resumeOne.controller"
import { retiroApproveExtractController } from "@/presentations/controllers/financial/retiro-approve.controller"
import { financialExtractPendingController } from "@/presentations/controllers/financial/extract-pending.controller"
import { financialExtractBinaryController } from "@/presentations/controllers/financial/extract-binary.controller"
import { addBalanceController } from "@/presentations/controllers/balance/add-balance.controller"
import { filterBalanceOrderController } from "@/presentations/controllers/balance/filter-order.controller"
import { adminMiddleware } from "@/middlewares/adminMiddleware"

const router = Router()


router.post("/order",
  // #swagger.tags = ['Webhook']
  authMiddleware,
  // adminMiddleware,
  expressRouteAdapter(addBalanceController)
)

router.get("/order",
  // #swagger.tags = ['Category']
  authMiddleware,
  // adminMiddleware,
  expressRouteAdapter(filterBalanceOrderController)
)






export default router;