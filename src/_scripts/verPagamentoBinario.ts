import moment from "moment";
import Prisma from "../../src/infra/db/prisma";

async function arrumar() {

    const sbp = await Prisma.strategyBinary.findFirst({
        where: {
            user_id: 1973
        },

    })

    const date = "2025-03-07"

    const start = moment(`${date}T05:00:00`).subtract(1, 'day').format("YYYY-MM-DDT05:00:00")
    const end = moment(`${date}T05:00:00`).format("YYYY-MM-DDT05:00:00")

    const hier_esquerda = `${sbp.hier}L%`
    const hier_direita = `${sbp.hier}R%`

    const esquerda = await Prisma.$queryRaw` SELECT 
                SUM(
                    IF(products.category_id IN (4), 
                        order_item.amount * order_item.quantity, 
                        (order_item.amount * order_item.quantity) / 2
                    )
                ) AS total
            FROM strategy_binary
            INNER JOIN \`order\` ON \`order\`.user_id = strategy_binary.user_id AND \`order\`.status = "DONE"
            INNER JOIN order_item ON order_item.order_id = \`order\`.id
            INNER JOIN products ON products.id = order_item.product_id AND products.category_id IN (2, 3, 4)
            WHERE strategy_binary.hier LIKE ${hier_esquerda} and \`order\`.created_at > ${start} and  \`order\`.created_at < ${end}`

    const direita = await Prisma.$queryRaw` SELECT 
            SUM(
                IF(products.category_id IN (4), 
                    order_item.amount * order_item.quantity, 
                    (order_item.amount * order_item.quantity) / 2
                )
            ) AS total
            FROM strategy_binary
            INNER JOIN \`order\` ON \`order\`.user_id = strategy_binary.user_id AND \`order\`.status = "DONE"
            INNER JOIN order_item ON order_item.order_id = \`order\`.id
            INNER JOIN products ON products.id = order_item.product_id AND products.category_id IN (2, 3, 4)
            WHERE strategy_binary.hier LIKE ${hier_direita}  and \`order\`.created_at > ${start} and  \`order\`.created_at < ${end}`
    
    console.log(date)
    console.log("esquerda", esquerda)
    console.log("direita", direita)

}


arrumar()