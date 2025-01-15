import { Router } from "express"

import { authMiddleware } from "@/middlewares/authMiddleware"
import { expressRouteAdapter } from "@/presentations/adapters/expressRouterAdapter"
import { plisioWebhookController } from "@/presentations/controllers/webhooks/plisioWebhook.controller"

const router = Router()

router.post("/plisio",
  // #swagger.tags = ['Webhook']
  authMiddleware,
  expressRouteAdapter(plisioWebhookController)
)



export default router;