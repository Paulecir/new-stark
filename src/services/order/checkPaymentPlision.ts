import PrismaLocal from "@/infra/db/prisma"
import axios from "axios"
import { OrderService } from "."
import Prisma from "@/infra/db/prisma"

export const checkPaymentPlisio = async (id: any) => {

    await PrismaLocal.$transaction(async (Prisma) => {
        const order = await Prisma.order.findUnique({
            where: {
                id
            }
        })

        if (!order) {
            return
        }
        // @ts-ignore
        const info = await axios.get(`https://api.plisio.net/api/v1/operations/${order.payment?.txn_id}?api_key=${process.env.PLISIO_KEY}`)
            .then(res => {
                return res.data?.data
            })
            .catch(err => {
                return err.data
            })
        if (info && ["mismatch", "completed"].includes(info.status)) {
            await OrderService.approveOrder({ orderId: order.order_id }, Prisma)
            await Prisma.order.update({
                where: {
                    id
                },
                data: {
                    payment_result: info
                }
            })
        }

        if (!info || ["expired", "error", "cancelled"].includes(info.status)) {
            await Prisma.order.update({
                where: {
                    id
                },
                data: {
                    status: "canceled",
                    payment_result: info || {}
                }
            })
        }
    },
        {
            timeout: 100000,
            maxWait: 100000
        })


}

export const checkAllPaymentPlisio = async () => {

    const orders = await Prisma.order.findMany({
        where: {
            status: "pending",
            payment_method: "PLISIO"
        }
    })

    for (const order of orders) {
        try {
            await checkPaymentPlisio(order.id)
        } catch {
        }
    }
}