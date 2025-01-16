import Prisma from "@/infra/db/prisma"
import { distributionDirect } from "../strategies/direct/distributionDirect"
import { distributionUnilevel } from "../strategies/unilevel/distributionUnilevel"
import { distributionBinary } from "../strategies/binary/distributionBinary"
import { addBinaryStrategy } from "../strategies/binary/createBinary"

export const approveOrder = async ({ orderId }: any) => {

    await Prisma.$transaction(async (Prisma) => {

        const order = await Prisma.order.findFirst({
            where: {
                order_id: orderId
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

            if (item.product.category.direct_bonus) distributionDirect({ order, item }, Prisma)

            if (item.product.category.unilevel_bonus) await distributionUnilevel({ order, item }, Prisma)

            if (item.product.category.binary_bonus_position) try { await addBinaryStrategy({ userId: parseInt(order.user_id.toString()) }, Prisma) } catch { }

            if (item.product.category.binary_bonus) await distributionBinary({ order, item }, Prisma)

        }

    }, {
        timeout: 100000,
        maxWait: 100000
    })


    return null
}