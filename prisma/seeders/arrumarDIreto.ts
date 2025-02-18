import Prisma from "../../src/infra/db/prisma";
import { distributionDirect } from "../../src/services/strategies/direct/distributionDirect"

async function arrumar() {

    const balanceHistory: any = await Prisma.$queryRaw`SELECT order_item.id FROM order_item
    LEFT JOIN balance_history bh on bh.ref_id = order_item.id AND bh.ref_type = "orderItem"
    WHERE order_item.created_at > "2025-02-01T00:00:00" AND bh.id IS NULL AND order_item.order_id = 15061`

    for (const bh of balanceHistory) {
        const item = await Prisma.orderItem.findFirst({
            where: {
                id: bh.id
            },
            include: {
                order: true,
                product: true
            }
        })

        if (!item) continue;
        await distributionDirect({ order: item.order, item }, Prisma)

    }

}


arrumar()