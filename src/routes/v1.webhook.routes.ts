import { Router } from "express"

import Prisma from "@/infra/db/prisma"
import { makeCommission } from "@/services/commission/makeCommission"
import { approvePayBinary } from "@/services/strategies/binary/approvePayBinary"
import { payBinary } from "@/services/strategies/binary/payBinary"
import { payCommission } from "@/services/commission/payCommission"
import { CommissionService } from "@/services/commission"
import { addBinaryStrategy } from "@/services/strategies/binary/createBinary"
import moment from "moment"
import { checkAllPaymentPlisio } from "@/services/order/checkPaymentPlision"
import multer from 'multer'
import { OrderService } from "@/services/order"
const upload = multer()
const router = Router()

router.post("/plisio/callback",
  upload.none(),
  // #swagger.tags = ['Webhook']
  async (req, res) => {

    console.log("A", req)
    console.log("R", req.body)
    const info = req.body
    if (info && ["mismatch", "completed"].includes(info.status)) {
      await OrderService.approveOrder({ orderId: info.order_number }, Prisma)
      await Prisma.order.updateMany({
        where: {
          order_id: info.order_number
        },
        data: {
          payment_result: req.body
        }
      })
    }

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
    console.log("B", req)
    console.log("C", req.body)
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
  await approvePayBinary(req.body)

  res.json({ end: true })
})
router.post("/addBinary", async (req, res) => {
  await addBinaryStrategy({ userId: req.body.user_id })

  res.json({ end: true })
})

router.get("/plisio", async (req, res) => {

  await checkAllPaymentPlisio()

  res.json({})
})

router.get("/scheduler/:id", async (req, res) => {

  if (!req.params.id) {
    res.json({ error: "id is required" })
    return
  }

  const a = await Prisma.$transaction(async (tx) => await CommissionService.createScheduler({
    category_id: req.params.id as any, type: "COMMISSION", date: req.query.date?.toString() || undefined
  }, tx), { timeout: 10000, maxWait: 10000 })

  res.json({ a })
})


router.get("/make", async (req, res) => {
  const a = await makeCommission()

  res.json({ a })
})

router.get("/pay", async (req, res) => {
  const a = await payCommission()

  res.json({ a })
})

export default router;