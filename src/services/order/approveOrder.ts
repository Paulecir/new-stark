import PrismaLocal from "@/infra/db/prisma"
import { distributionDirect } from "../strategies/direct/distributionDirect"
import { distributionUnilevel } from "../strategies/unilevel/distributionUnilevel"
import { distributionBinary } from "../strategies/binary/distributionBinary"
import { addBinaryStrategy } from "../strategies/binary/createBinary"
import { qualifyBinary } from "../strategies/binary/qualifyBinary"

export const approveOrder = async ({ orderId }: any, Prisma = PrismaLocal) => {

    let order = await Prisma.order.findFirst({
        where: {
            order_id: orderId
        },
        include: {
            user: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                    login: true
                }
            },
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

    order = await Prisma.order.update({
        where: {
            id: order.id
        },
        data: {
            status: 'done'
        },
        include: {
            user: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                    login: true
                }
            },
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

    for (const item of order.OrderItem) {

        if (item.product.category.direct_bonus) distributionDirect({ order, item }, Prisma)

        if (item.product.category.unilevel_bonus) await distributionUnilevel({ order, item }, Prisma)

        if (item.product.category.binary_bonus_position) try { await addBinaryStrategy({ userId: parseInt(order.user_id.toString()) }, Prisma) } catch { }

        if (item.product.category.binary_bonus) await distributionBinary({ order, item }, Prisma)

        if (item.product.category.binary_bonus_qualify) await qualifyBinary({ order, item }, Prisma)
    }

    return order
}