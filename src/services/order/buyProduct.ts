import Prisma from "@/infra/db/prisma"
import { randomUUID } from "crypto"

export const buyProduct = async (data: any, user: any) => {

    const order = await Prisma.$transaction(async (tx) => {

        const order = await tx.order.create({
            data: {
                user_id: user.id,
                order_id: randomUUID()
            }
        })

        for (const item of data.items) {
            const product = await tx.product.findUnique({
                where: {
                    id: item.id
                }
            })
            await tx.orderItem.create({
                data: {
                    order_id: order.id,
                    product_id: product.id,
                    amount: product.price,
                    quantity: item.quantity,
                }
            })
        }

        return order
    })
    return order
}