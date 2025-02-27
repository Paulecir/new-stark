import Prisma from "../../src/infra/db/prisma";
import { payCommission } from "../../src/services/commission/payCommission"

async function arrumar() {
   await payCommission()
}

arrumar()