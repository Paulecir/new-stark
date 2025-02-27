import Prisma from "../../src/infra/db/prisma";
import { approvePayCommission } from "../../src/services/commission/approvePayCommission"

async function arrumar() {
   await approvePayCommission()
}

arrumar()