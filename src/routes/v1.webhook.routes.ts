import { Router } from "express"

import { authMiddleware } from "@/middlewares/authMiddleware"
import { expressRouteAdapter } from "@/presentations/adapters/expressRouterAdapter"
import { plisioWebhookController } from "@/presentations/controllers/webhooks/plisioWebhook.controller"
import { payBinary } from "@/services/strategies/binary/payBinary"
import { approvePayBinary } from "@/services/strategies/binary/approvePayBinary"

const router = Router()

router.post("/plisio/callback",
  // #swagger.tags = ['Webhook']
  (req, res) => {
    res.json(req.body)
  }
)

router.get("/plisio/callback",
  // #swagger.tags = ['Webhook']
  (req, res) => {
    res.json(req.query)
  }
)

router.post("/binary", async (req, res) => {
  await payBinary()

  res.json({ end: true })
})

router.post("/approveBinary", async (req, res) => {
  await approvePayBinary()

  res.json({ end: true })
})


export default router;