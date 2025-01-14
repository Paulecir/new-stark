import Prisma from "@/infra/db/prisma"
import { distributionDirect } from "../strategies/direct/distributionDirect"
import { distributionUnilevel } from "../strategies/unilevel/distributionUnilevel"
import { distributionBinary } from "../strategies/binary/distributionBinary"

export const approveOrder = async (data: any) => {

    await Prisma.$transaction(async (tx) => {

        const order = await tx.order.findFirst({
            where: {
                order_id: "bbe00ca0-d5db-437f-9a25-b5cf7265e2f6"
            },
            include: {
                OrderItem: {
                    include: {
                        product: {
                            include: {
                                category: true
                            }
                        }
                    }
                }
            }
        })

        if (!order) {
            throw new Error("Order not found")
        }

        if (order.status === 'done') throw new Error("Order done")

        await Prisma.order.update({
            where: {
                id: order.id
            },
            data: {
                status: 'done'
            }
        })

        for (const item of order.OrderItem) {

            if (item.product.category.direct_bonus) distributionDirect({ order, item }, tx)

            if (item.product.category.unilevel_bonus) await distributionUnilevel({ order, item }, tx)

            if (item.product.category.binary_bonus) await distributionBinary({ order, item }, tx)

        }
    })


    return null
}