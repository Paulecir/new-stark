import Prisma from "../../src/infra/db/prisma";

async function arrumar() {

    const users: any = await Prisma.$queryRaw`SELECT * FROM strategy_binary WHERE hier like "LLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLRLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL%" ORDER BY level`
    let ct = users.length
    for (const user of users) {
        console.log(`Faltam ${ct--}`)
        // Arrumar esquerda
        const hl = user.hier + "L%"

        const esquerda: any = await Prisma.$queryRaw`
            SELECT 
                SUM(
                    IF(products.category_id IN (4), 
                        order_item.amount * order_item.quantity, 
                        (order_item.amount * order_item.quantity) / 2
                    )
                ) AS total
            FROM strategy_binary
            INNER JOIN \`order\` ON \`order\`.user_id = strategy_binary.user_id AND \`order\`.status = ${"DONE"}
            INNER JOIN order_item ON order_item.order_id = \`order\`.id
            INNER JOIN products ON products.id = order_item.product_id AND products.category_id IN (2, 3, 4)
            WHERE LOWER(strategy_binary.hier) LIKE LOWER(${hl})
        `;

        const totalEsquerda = esquerda?.[0]?.total || 0

        const hr = user.hier + "R%"

        const direita: any = await Prisma.$queryRaw`
            SELECT 
                SUM(
                    IF(products.category_id IN (4), 
                        order_item.amount * order_item.quantity, 
                        (order_item.amount * order_item.quantity) / 2
                    )
                ) AS total
            FROM strategy_binary
            INNER JOIN \`order\` ON \`order\`.user_id = strategy_binary.user_id AND \`order\`.status = ${"DONE"}
            INNER JOIN order_item ON order_item.order_id = \`order\`.id
            INNER JOIN products ON products.id = order_item.product_id AND products.category_id IN (2, 3, 4)
            WHERE LOWER(strategy_binary.hier) LIKE LOWER(${hr})
        `;

        const totalDireita = direita?.[0]?.total || 0

        await Prisma.balance.upsert({
            where: {
                user_id_wallet: {
                    user_id: user.user_id,
                    wallet: "BINARY_LEFT_POINT_TOTAL_NEW"
                }
            },
            create: {
                user_id: user.user_id,
                wallet: "BINARY_LEFT_POINT_TOTAL_NEW",
                amount: totalEsquerda
            },
            update: {
                amount: totalEsquerda
            }
        })

        await Prisma.balance.upsert({
            where: {
                user_id_wallet: {
                    user_id: user.user_id,
                    wallet: "BINARY_RIGHT_POINT_TOTAL_NEW"
                }
            },
            create: {
                user_id: user.user_id,
                wallet: "BINARY_RIGHT_POINT_TOTAL_NEW",
                amount: totalDireita
            },
            update: {
                amount: totalDireita
            }
        })

    }



}


arrumar()