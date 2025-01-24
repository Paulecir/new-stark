import PrismaLocal from "@/infra/db/prisma";
import { addBalance } from "@/services/balance/addBalance";

export const qualifyBinary = async ({ order, item }: any, Prisma = PrismaLocal) => {

    const category = await Prisma.category.findFirst({
        where: {
            id: item.product.category_id,
        },
    })

    const currentUser = await Prisma.user.findFirst({
        where: {
            id: order.user_id
        }
    })

    const binary = await Prisma.strategyBinary.findFirst({
        where: {
            user_id: order.user_id
        }
    })

    if (!binary) return 


    const direction = binary.ref;

    if (direction === 'L') {
        await Prisma.strategyBinary.updateMany({
            where: {
                user_id: currentUser.sponsor_id
            },
            data: {
                left_qualify: true
            }
        })
    }

    if (direction === 'R') {
        await Prisma.strategyBinary.updateMany({
            where: {
                user_id: currentUser.sponsor_id
            },
            data: {
                right_qualify: true
            }
        })
    }

    await Prisma.strategyBinary.updateMany({
        where: {
            user_id: currentUser.id
        },
        data: {
            qualify: true
        }
    })

}