import PrismaLocal from "@/infra/db/prisma"
import axios from "axios"
import { randomUUID } from "crypto"

export const buyProduct = async (data: any, user: any, Prisma = PrismaLocal) => {

    let order = await Prisma.order.create({
        data: {
            user_id: user.id,
            order_id: randomUUID()
        }
    })

    let total = 0
    for (const item of data.items) {
        const product = await Prisma.product.findUnique({
            where: {
                id: item.id
            }
        })

        total += (product.price.toNumber() * item.quantity)
        await Prisma.orderItem.create({
            data: {
                order_id: order.id,
                product_id: product.id,
                amount: product.price,
                quantity: item.quantity,
                wallet_id: item.wallet_id ? Number(item.wallet_id) : null
            }
        })
    }

    await Prisma.order.update({
        where: {
            id: order.id
        },
        data: {
            total
        }
    })

    return order
}