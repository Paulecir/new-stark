import { authMiddleware } from "@/middlewares/authMiddleware"
import { expressRouteAdapter } from "@/presentations/adapters/expressRouterAdapter"
import { getUserController } from "@/presentations/controllers/users/get.controller"
import { Router } from "express"


const router = Router()

router.get("/",
  // #swagger.tags = ['User']
  (req, res) => { res.json({}) }
)

router.get("/:id",
  // #swagger.tags = ['User']
  expressRouteAdapter(getUserController)
)

router.put("/:id",
  // #swagger.tags = ['User']
  (req, res) => { res.json({}) }
)

export default router;