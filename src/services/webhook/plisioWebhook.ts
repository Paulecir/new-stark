import Prisma from "@/infra/db/prisma";
import { approveOrder } from "../order/approveOrder";

export const plisioWebhook = async (data: any) => {

    const orderId = data.data.order_number

    await Prisma.order.updateMany({
        where: {
            order_id: orderId
        },
        data: {
            payment_result: data.data
        }
    })


    return await approveOrder(orderId);
}