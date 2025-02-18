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
            type: "UNILEVEL",
            max_value: { lt: sum }
        },
        orderBy: {
            max_value: 'asc'
        },
        include: {
            category: true
        }
    })

    if (!categoryItem) return null;

    const hier = []

    let currentUser = await Prisma.user.findUnique({
        where: {
            id: order.user_id
        }
    })

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
            await addBalance({ 
                name: `${categoryItem.category.name} Unilevel (#${order.id}) - Pontos: ${item.amount * (categoryItem.level_values[i] / 100)} - Consultor: ${currentUser.name} [${i + 1}º Nível]`
                , wallet: "MAIN"
                , user_id: current.id
                , amount: item.amount * (categoryItem.level_values[i] / 100)
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

    return items;
}