import { Router } from "express"

import { expressRouteAdapter } from "@/presentations/adapters/expressRouterAdapter"
import { createProductController } from "@/presentations/controllers/products/create.controller"
import { authMiddleware } from "@/middlewares/authMiddleware"
import { filterProductController } from "@/presentations/controllers/products/filter.controller"
import { updateProductController } from "@/presentations/controllers/products/update.controller"
import { getProductController } from "@/presentations/controllers/products/get.controller"

const router = Router()

router.get("/",
  // #swagger.tags = ['Product']
  // #swagger.summary = 'Filtrar Produtos'
  // #swagger.description = 'Filtra produtos com base nos critérios fornecidos.'
  authMiddleware,
  expressRouteAdapter(filterProductController)
)

router.post("/create",
  // #swagger.tags = ['Product']
  // #swagger.summary = 'Criar Produto'
  // #swagger.description = 'Cria um novo produto.'
  expressRouteAdapter(createProductController)
)

router.get("/:id",
  // #swagger.tags = ['Product']
  // #swagger.summary = 'Obter Produto'
  // #swagger.description = 'Obtém um produto pelo ID.'
  authMiddleware,
  expressRouteAdapter(getProductController)
)

router.put("/:id",
  // #swagger.tags = ['Product']
  // #swagger.summary = 'Atualizar Produto'
  // #swagger.description = 'Atualiza um produto pelo ID.'
  authMiddleware,
  expressRouteAdapter(updateProductController)
)

export default router;