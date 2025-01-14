import Prisma from "@/infra/db/prisma";
import { addBalance } from "@/services/balance/addBalance";

export const distributionDirect = async ({ order, item }: any, db = Prisma) => {

    const category = await Prisma.category.findFirst({
        where: {
            id: item.product.category_id,
        },
    })

    const hier = []

    let current = await Prisma.user.findUnique({
        where: {
            id: order.user_id
        }
    })


    if (current.sponsor_id) {
        current = await Prisma.user.findFirst({
            where: {
                id: current.sponsor_id
            }
        })

        if (current) {
            await addBalance({ name: "Direct strategy", wallet: "MAIN", user_id: current.id, amount: item.amount * (category.direct_bonus_yield.toNumber() / 100), ref_type: 'orderItem', ref_id: item.id }, Prisma)
        }
    }

}