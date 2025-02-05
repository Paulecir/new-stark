import { Router } from "express"

import Prisma from "@/infra/db/prisma"
import { makeCommission } from "@/services/commission/makeCommission"
import { approvePayBinary } from "@/services/strategies/binary/approvePayBinary"
import { payBinary } from "@/services/strategies/binary/payBinary"
import { payCommission } from "@/services/commission/payCommission"
import { CommissionService } from "@/services/commission"

const router = Router()

router.post("/plisio/callback",
  // #swagger.tags = ['Webhook']
  async (req, res) => {

    console.log("A", req)
    console.log("R", req.body)
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

// router.get("/teste", async (req, res) => {
//   const categories = await Prisma.category.findMany()

//   for (const category of categories) {
//     await Prisma.$transaction(async (tx) => await CommissionService.createScheduler({
//       category_id: category.id, type: "COMMISSION"
//     }, tx), { timeout: 10000, maxWait: 10000 })
//   }
//   // await checkAllPaymentPlisio()

//   res.json({})
// })

router.get("/scheduler/:id", async (req, res) => {

  if (!req.params.id) {
    res.json({ error: "id is required" })
    return
  }

  const a = await Prisma.$transaction(async (tx) => await CommissionService.createScheduler({
    category_id: req.params.id as any, type: "COMMISSION", date: req.query.date?.toString()
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