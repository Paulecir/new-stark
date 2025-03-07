import moment from "moment";
import Prisma from "../../src/infra/db/prisma";

async function arrumar() {

    const sbps = await Prisma.strategyBinaryPay.findMany({
        where: {
            user_id: 1973
        },
        include: {
            binary: true
        }
    })

    let point_esquerda = 0
    let point_direita = 0
    let total_esquerda = 0
    let total_direita = 0

    for (const sbp of sbps) {
        const start = moment(`${sbp.date}T05:00:00`).subtract(1, 'day').format("YYYY-MM-DDT05:00:00")
        const end = moment(`${sbp.date}T05:00:00`).format("YYYY-MM-DDT05:00:00")

        const hier_esquerda = `${sbp.binary.hier}L%`
        const hier_direita = `${sbp.binary.hier}R%`

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

        point_esquerda += esquerda[0].total?.toNumber() || 0
        total_esquerda += esquerda[0].total?.toNumber() || 0
        point_direita += direita[0].total?.toNumber() || 0
        total_direita += direita[0].total?.toNumber() || 0

        let amount = 0
        if (point_direita < point_esquerda) {
            amount = point_direita
            console.log(sbp.date, "DIREITA", amount, sbp.amount.toNumber(), (sbp.amount.toNumber() !== amount ? "DIF" : "EQ") ,", -> ",point_esquerda, point_direita , " TOTAL ", total_esquerda, total_direita)
        } 

        if (point_esquerda < point_direita ) {
            amount = point_esquerda
            console.log(sbp.date, "ESQUERDA", amount, sbp.amount.toNumber(),  (sbp.amount.toNumber() !== amount ? "DIF" : "EQ") , ", -> ",point_esquerda, point_direita , " TOTAL ", total_esquerda, total_direita)
        } 
        
        point_esquerda -= amount
        point_direita -= amount



        if (sbp.amount.toNumber() !== amount) {
            console.log("DIFERENTE")
        }
           
       
    }

}


arrumar()