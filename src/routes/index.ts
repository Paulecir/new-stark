/* eslint-disable node/no-path-concat */
import { Router } from "express"

import authApiV1 from './v1.auth.routes'
import usersApiV1 from './v1.users.routes'
import productsApiV1 from './v1.products.routes'

const router = Router();

router.use('/v1/auth', authApiV1)
router.use('/v1/users', usersApiV1)
router.use('/v1/products', productsApiV1)

export default router;
