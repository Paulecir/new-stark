import { JwtAdapter } from "@/infra/criptography/jwt-adapter"
import bcrypt from "bcrypt"
import { Router } from "express"

import Prisma from "@/infra/db/prisma"
import { expressRouteAdapter } from "@/presentations/adapters/expressRouterAdapter"
import { signInController } from "@/presentations/controllers/auth/signIn.controller"
import { signUpController } from "@/presentations/controllers/auth/signUp.controller"

const router = Router()

router.get("/",
  // #swagger.tags = ['User']
  (req, res) => { res.json({}) }
)

router.get("/{id}",
  // #swagger.tags = ['User']
  (req, res) => { res.json({}) }
)

router.put("/{id}",
  // #swagger.tags = ['User']
  (req, res) => { res.json({}) }
)

export default router;