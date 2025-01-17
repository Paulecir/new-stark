import { Router } from "express"

import { authMiddleware } from "@/middlewares/authMiddleware"
import { expressRouteAdapter } from "@/presentations/adapters/expressRouterAdapter"
import { plisioWebhookController } from "@/presentations/controllers/webhooks/plisioWebhook.controller"
import { payBinary } from "@/services/strategies/binary/payBinary"
import { approvePayBinary } from "@/services/strategies/binary/approvePayBinary"
import Prisma from "@/infra/db/prisma"

const router = Router()

router.post("/plisio/callback",
  // #swagger.tags = ['Webhook']
  async (req, res) => {

    await Prisma.webhook.create({
      data: {
        request: req.body
      }
    }).then()
      .catch()
    res.json(req.body)
  }
)

router.get("/plisio/callback",
  // #swagger.tags = ['Webhook']
  async (req, res) => {
    await Prisma.webhook.create({
      data: {
        request: req.query
      }
    }).then()
      .catch()
    res.json(req.query)
  }
)

router.post("/plisio/orders",
  // #swagger.tags = ['Webhook']
  async (req, res) => {

    await Prisma.webhook.create({
      data: {
        request: req.body
      }
    }).then()
      .catch()
    res.json(req.body)
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