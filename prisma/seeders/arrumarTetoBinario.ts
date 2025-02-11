import Prisma from "../../src/infra/db/prisma";

async function arrumar() {

    const balanceBinaryCeilingUser: any = await Prisma.$queryRaw`SELECT 
                    O.user_id,
                    sum(OI.amount * (C.binary_bonus_point_percent / 100)) as amount
                FROM 
                    order_item OI
                INNER JOIN \`order\` O ON O.id = OI.order_id
                INNER JOIN products P ON P.id = OI.product_id
                INNER JOIN categories C ON C.id = P.category_id
                WHERE P.category_id IN (2, 3, 4) and O.status = 'done'
                GROUP BY O.user_id
                `
    let i = balanceBinaryCeilingUser.length
    for (const u of balanceBinaryCeilingUser || []) {
        console.log(i--)
        const categoryBinaryQualify = await Prisma.categoryItem.findFirst({
            where: {
                category_id: 4,
                type: 'BINARY',
                max_value: {
                    gte: u.amount || 0
                }
            },
            orderBy: {
                max_value: 'asc'
            }
        })

        const amountCeilingUser = categoryBinaryQualify?.level_values?.[0] || 0

        await Prisma.strategyBinaryPay.updateMany({
            where: {
                user_id: u.user_id
            },
            data: {
                amountCeilingUser
            }
        })
    }
}


arrumar()