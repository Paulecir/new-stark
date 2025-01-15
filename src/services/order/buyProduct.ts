import Prisma from "@/infra/db/prisma"
import axios from "axios"
import { randomUUID } from "crypto"

export const buyProduct = async (data: any, user: any) => {

    const order = await Prisma.$transaction(async (tx) => {

        const order = await tx.order.create({
            data: {
                user_id: user.id,
                order_id: randomUUID()
            }
        })

        let total = 0
        for (const item of data.items) {
            const product = await tx.product.findUnique({
                where: {
                    id: item.id
                }
            })

            total += (product.price.toNumber() * item.quantity)
            await tx.orderItem.create({
                data: {
                    order_id: order.id,
                    product_id: product.id,
                    amount: product.price,
                    quantity: item.quantity,
                }
            })
        }

        const info = await axios.get(`https://api.plisio.net/api/v1/invoices/new?source_currency=USD&source_amount=${total}&order_number=${order.order_id}&currency=USDT_BSC&email=customer@plisio.net&order_name=btc1&callback_url=http://test.com/callback&api_key=xh1vHWERjGLw4lRqN2cxuVXhpcRz0mO7JF39YjhMiMIQGMos72lYlfdCMdriYnQz&json=true&return_existing=true`)
            .then(res => res.data?.data)
            .catch(err => err.reponse.data)

        await tx.order.update({
            where: {
                id: order.id
            },
            data: {
                status: "pending",
                payment: info
            }
        })

        return order
    },{
        timeout: 100000,
        maxWait: 100000
    })
    return order
}