import PrismaLocal from "@/infra/db/prisma"
import { distributionDirect } from "../strategies/direct/distributionDirect"
import { distributionUnilevel } from "../strategies/unilevel/distributionUnilevel"
import { distributionBinary } from "../strategies/binary/distributionBinary"
import { addBinaryStrategy } from "../strategies/binary/createBinary"
import { qualifyBinary } from "../strategies/binary/qualifyBinary"

export const reproveOrder = async ({ orderId }: any, Prisma = PrismaLocal) => {

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

    if (order.status === 'canceled') throw new Error("Order canceled")

    order = await Prisma.order.update({
        where: {
            id: order.id
        },
        data: {
            status: 'canceled'
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

    return order
}