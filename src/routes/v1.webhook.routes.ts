import { Router } from "express"
import PrismaLocal from "@/infra/db/prisma"

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
import { distributionDirect } from "@/services/strategies/direct/distributionDirect"
import { distributionUnilevel } from "@/services/strategies/unilevel/distributionUnilevel"
import { distributionBinary } from "@/services/strategies/binary/distributionBinary"
import { qualifyBinary } from "@/services/strategies/binary/qualifyBinary"
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

router.post("/execorder", async (req, res) => {

  const order = await PrismaLocal.order.findFirst({
    where: {
      id: req.body.id
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          login: true
        }
      },
      OrderItem: {
        include: {
          product: {
            include: {
              category: true
            }
          }
        }
      }
    }
  })
  for (const item of order.OrderItem) {
    if (item.product.category.direct_bonus) distributionDirect({ order, item }, Prisma)

    if (item.product.category.unilevel_bonus) await distributionUnilevel({ order, item }, Prisma)

    if (item.product.category.binary_bonus_position) try { await addBinaryStrategy({ userId: parseInt(order.user_id.toString()) }, Prisma) } catch { }

    if (item.product.category.binary_bonus) await distributionBinary({ order, item }, Prisma)

    if (item.product.category.binary_bonus_qualify) await qualifyBinary({ order, item }, Prisma)
  }

  res.send({ ok: true })
})

export default router;