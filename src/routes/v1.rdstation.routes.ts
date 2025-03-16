import { Router } from "express"

import { expressRouteAdapter } from "@/presentations/adapters/expressRouterAdapter"
import { helloRdstationController } from "@/presentations/controllers/rdstation/hello.controller"

const router = Router()

router.get("/",
  // #swagger.tags = ['Webhook']
  // #swagger.summary = 'Hello RDStation'
  // #swagger.description = 'Endpoint de exemplo para RDStation.'
  expressRouteAdapter(helloRdstationController)
)

export default router;