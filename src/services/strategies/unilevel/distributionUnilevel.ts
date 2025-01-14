import PrismaLocal from "@/infra/db/prisma";
import { addBalance } from "@/services/balance/addBalance";

export const distributionUnilevel = async ({ order, item }: any, Prisma = PrismaLocal) => {

    const items = await Prisma.orderItem.findMany({
        where: {
            AND: [
                {
                    order: {
                        status: "done"
                    }
                },
                {
                    product: {
                        category: {
                            unilevel_bonus: true
                        }
                    }
                }
            ]
        },
        include: {
            order: true
        }
    }).catch(err => {
        console.log(err)
    })

    const sum = (items || []).reduce((acc: any, item: any) => {
        return acc + item.amount.toNumber();
    }, 0);

    if (sum === 0) return;

    const categoryItem = await Prisma.categoryItem.findFirst({
        where: {
            category_id: item.product.category_id,
            max_value: { lt: sum }
        },
        orderBy: {
            max_value: 'asc'
        },
        include: {
            category: true
        }
    })

    const hier = []

    let current = await Prisma.user.findUnique({
        where: {
            id: order.user_id
        }
    })

    for (let i = 0; i < categoryItem.category.unilevel_bonus_levels; i++) {

        if (!current.sponsor_id) break;

        current = await Prisma.user.findFirst({
            where: {
                id: current.sponsor_id
            }
        })

        if (!current) break

        if (categoryItem.level_values[i] > 0) {
            await addBalance({ name: "Unilevel strategy", wallet: "MAIN", user_id: current.id, amount: item.amount * (categoryItem.level_values[i] / 100), ref_type: 'orderItem', ref_id: item.id }, Prisma)
        }

    }

    return items;
}