import { Router } from "express"

import { authMiddleware } from "@/middlewares/authMiddleware"
import { expressRouteAdapter } from "@/presentations/adapters/expressRouterAdapter"
import { plisioWebhookController } from "@/presentations/controllers/webhooks/plisioWebhook.controller"

const router = Router()

router.get("/extract",
  // #swagger.tags = ['Webhook']
  authMiddleware,
  // expressRouteAdapter(financialExtractController)
)



export default router;