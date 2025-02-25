import Prisma from "../../src/infra/db/prisma";

async function arrumar() {

    const users = await Prisma.strategyBinary.findMany({
        orderBy: {
            hier: 'asc'
        },
    })
    let i = users.length
    for (const user of users) {
        if (!user) continue;
        console.log("A", i--)
        try {
            const _queryLeft = `SELECT 
                    sum(order_item.quantity * IF (products.category_id = 4, order_item.amount, order_item.amount / 2)) as amount
                FROM
                    strategy_binary
                INNER JOIN users ON users.id = strategy_binary.user_id
                INNER JOIN \`order\` o ON o.user_id = users.id
                INNER JOIN order_item ON order_item.order_id = o.id
                INNER JOIN products ON products.id = order_item.product_id
                WHERE hier like '${user.hier}L%' and o.status = 'done' and (products.category_id = 4 or products.category_id = 3 or products.category_id = 2) 
                ORDER BY hier`
            const left = await Prisma.$queryRawUnsafe(_queryLeft)
            const amountLeft = left?.[0]?.amount || 0;

            await Prisma.balance.upsert({
                where: {
                    user_id_wallet: {
                        user_id: user.user_id,
                        wallet: "BINARY_LEFT_POINT_TOTAL"
                    }
                },
                create: {
                    user_id: user.user_id,
                    wallet: "BINARY_LEFT_POINT_TOTAL",
                    amount: amountLeft
                },
                update: {
                    amount: amountLeft
                }
            })

            console.log("LEFT")

            const _queryRight = `SELECT 
                    sum(order_item.quantity * IF (products.category_id = 4, order_item.amount, order_item.amount / 2)) as amount
                FROM
                    strategy_binary
                INNER JOIN users ON users.id = strategy_binary.user_id
                INNER JOIN \`order\` o ON o.user_id = users.id
                INNER JOIN order_item ON order_item.order_id = o.id
                INNER JOIN products ON products.id = order_item.product_id
                WHERE hier like '${user.hier}R%' and o.status = 'done' and (products.category_id = 4 or products.category_id = 3 or products.category_id = 2) 
                ORDER BY hier`
            const right = await Prisma.$queryRawUnsafe(_queryRight)
            const amountRight = right?.[0]?.amount || 0;
            
            await Prisma.balance.upsert({
                where: {
                    user_id_wallet: {
                        user_id: user.user_id,
                        wallet: "BINARY_RIGHT_POINT_TOTAL"
                    }
                },
                create: {
                    user_id: user.user_id,
                    wallet: "BINARY_RIGHT_POINT_TOTAL",
                    amount: amountRight
                },
                update: {
                    amount: amountRight
                }
            })

            console.log("RIGHT")

        } catch (err) {
            console.log("E", err)
        }




    }



}


arrumar()