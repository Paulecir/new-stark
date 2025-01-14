import PrismaLocal from "@/infra/db/prisma";
import { addBalance } from "@/services/balance/addBalance";

export const distributionBinary = async ({ order, item }: any, Prisma = PrismaLocal) => {

    const category = await Prisma.category.findFirst({
        where: {
            id: item.product.category_id,
        },
    })

    const point = item.amount.toNumber() * (category.binary_bonus_point_percent.toNumber() / 100)

    console.log("C", point)

    let binary = await Prisma.strategyBinary.findFirst({
        where: {
            user_id: order.user_id
        },
        include: {
            user: true,
            parent: {
                include: {
                    user: true
                }
            }
        }
    })


    do {

        if (binary.ref === "R") {
            const a = await Prisma.strategyBinary.update(
                {
                    where: {
                        id: binary.parent.id
                    },
                    data: {
                        right_point: {
                            increment: point
                        }
                    }
                })
        }

        if (binary.ref === "L") {
            await Prisma.strategyBinary.update(
                {
                    where: {
                        id: binary.parent.id
                    },
                    data: {
                        left_point: {
                            increment: point
                        }
                    }
                })
        }

        if (!binary.parent) break;

        binary = await Prisma.strategyBinary.findFirst({
            where: {
                id: binary.parent.id
            },
            include: {
                user: true,
                parent: {
                    include: {
                        user: true
                    }
                }
            }
        })


    } while (binary)

    return [];
}