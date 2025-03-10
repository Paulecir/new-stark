import { Router } from "express"

import { authMiddleware } from "@/middlewares/authMiddleware"
import { expressRouteAdapter } from "@/presentations/adapters/expressRouterAdapter"
import { buyOrderController } from "@/presentations/controllers/orders/buy.controller"
import { approveOrderController } from "@/presentations/controllers/orders/approve.controller"
import { getOrderController } from "@/presentations/controllers/orders/get.controller"
import { payOrderController } from "@/presentations/controllers/orders/pay.controller"
import { myOrderItemsController } from "@/presentations/controllers/orders/my-order-items.controller"
import { myOrdersController } from "@/presentations/controllers/orders/my-orders.controller"
import { ordersController } from "@/presentations/controllers/orders/orders.controller"
import { reproveOrderController } from "@/presentations/controllers/orders/reprove.controller copy"

const router = Router()



router.post("/payment/:id",
  authMiddleware,
  expressRouteAdapter(payOrderController)
)

router.get("/orders",
  // #swagger.tags = ['Order']
  authMiddleware,
  expressRouteAdapter(ordersController)
)

router.post("/my-orders",
  // #swagger.tags = ['Order']
  authMiddleware,
  expressRouteAdapter(myOrdersController)
)

router.post("/my-order-items",
  // #swagger.tags = ['Order']
  authMiddleware,
  expressRouteAdapter(myOrderItemsController)
)

router.post("/buy",
  // #swagger.tags = ['Order']
  authMiddleware,
  expressRouteAdapter(buyOrderController)
)

router.post("/approve",
  // #swagger.tags = ['Order']
  authMiddleware,
  expressRouteAdapter(approveOrderController)
)

router.post("/reprove",
  // #swagger.tags = ['Order']
  authMiddleware,
  expressRouteAdapter(reproveOrderController)
)


router.get("/:orderId",
  // #swagger.tags = ['Order']
  authMiddleware,
  expressRouteAdapter(getOrderController)
)

export default router;