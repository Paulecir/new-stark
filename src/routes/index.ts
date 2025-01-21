/* eslint-disable node/no-path-concat */
import { Router } from "express"

import authApiV1 from './v1.auth.routes'
import usersApiV1 from './v1.users.routes'
import productsApiV1 from './v1.products.routes'
import ordersApiV1 from './v1.orders.routes'
import categoriesApiV1 from './v1.categories.routes'
import webhookApiV1 from './v1.webhook.routes'
import binaryApiV1 from './v1.binary.routes'
import rdstationApiV1 from './v1.rdstation.routes'
import financialApiV1 from './v1.financial.routes'
import dashboardApiV1 from './v1.dashboard.routes'
import walletsApiV1 from './v1.wallets.routes'
import commissionsApiV1 from './v1.commissions.routes'

const router = Router();

router.use('/v1/auth', authApiV1)
router.use('/v1/users', usersApiV1)
router.use('/v1/products', productsApiV1)
router.use('/v1/orders', ordersApiV1)
router.use('/v1/categories', categoriesApiV1)
router.use('/v1/webhook', webhookApiV1)
router.use('/v1/binary', binaryApiV1)
router.use('/v1/rdstation', rdstationApiV1)
router.use('/v1/financial', financialApiV1)
router.use('/v1/dashboard', dashboardApiV1)
router.use('/v1/commissions', commissionsApiV1)
router.use('/v1/wallets', walletsApiV1)

export default router;
