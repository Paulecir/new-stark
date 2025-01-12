import { Router } from "express"

import { expressRouteAdapter } from "@/presentations/adapters/expressRouterAdapter"
import { createProductController } from "@/presentations/controllers/products/create.controller"

const router = Router()

router.get("/",
  // #swagger.tags = ['Product']
  (req, res) => { res.json({}) }
)

router.post("/",
  // #swagger.tags = ['Product']
  expressRouteAdapter(createProductController)
)

router.get("/{id}",
  // #swagger.tags = ['Product']
  (req, res) => { res.json({}) }
)

router.put("/{id}",
  // #swagger.tags = ['Product']
  (req, res) => { res.json({}) }
)

export default router;