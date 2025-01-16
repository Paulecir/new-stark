import PrismaLocal from "@/infra/db/prisma";
import { addBalance } from "@/services/balance/addBalance";

export const distributionDirect = async ({ order, item }: any, Prisma = PrismaLocal) => {

    const category = await Prisma.category.findFirst({
        where: {
            id: item.product.category_id,
        },
    })

    const hier = []

    let currentUser = await Prisma.user.findUnique({
        where: {
            id: order.user_id
        }
    })

    if (currentUser.sponsor_id) {
        const current = await Prisma.user.findFirst({
            where: {
                id: currentUser.sponsor_id
            }
        })

        if (current) {
            await addBalance({ 
                name: "Direct strategy"
                , wallet: "MAIN"
                , user_id: current.id
                , amount: item.amount * (category.direct_bonus_yield.toNumber() / 100)
                , ref_type: 'orderItem'
                , ref_id: item.id
                , extra_info: {
                    from: currentUser.id,
                    fromName: currentUser.name,
                    fromLogin: currentUser.login,
                    to: current?.id,
                    toName: current?.name,
                    toLogin: current?.login,
                    productId: item.product.id,
                    productName: item.product.name,
                    productPrice: item.product.price,
                }

             }, Prisma)
        }
    }

}