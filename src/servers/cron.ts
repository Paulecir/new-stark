import Prisma from "@/infra/db/prisma"
import { CommissionService } from "@/services/commission"
import { makeCommission } from "@/services/commission/makeCommission"
import { arrumarBinario } from "@/services/fix/arrumarBinario"
import { OrderService } from "@/services/order"
import { approvePayBinary } from "@/services/strategies/binary/approvePayBinary"
import { addBinaryStrategy } from "@/services/strategies/binary/createBinary"
import { payBinary } from "@/services/strategies/binary/payBinary"
import nodeSchedule from "node-schedule"

export const initCronjob = async () => {
    console.log("INIT")

    // arrumarBinario()

    if (process.env.CRONJOB !== "true") return;
    console.log("START CRON")

    let rule = new nodeSchedule.RecurrenceRule();
    rule.tz = "America/Sao_Paulo"
    rule.hour = 22
    rule.minute = 10


  

    nodeSchedule.scheduleJob("1 22 * * *", async (job) => {
        const categories = await Prisma.category.findMany({
            where: {
                commission: true
            }
        })

        for (const category of categories) {
            await Prisma.$transaction(async (tx) => await CommissionService.createScheduler({
                category_id: category.id, type: "COMMISSION", date: null
            }, tx), { timeout: 10000, maxWait: 10000 })
        }
    })

    nodeSchedule.scheduleJob("*/10 * * * *", async (job) => {
        await makeCommission()
        console.log("MAKE BINARY")
    })

    //  nodeSchedule.scheduleJob("* * * * *", async (job) => {
    //     await   makeCommission().then(res => {
    //         console.log("FIM")
    //     })
    //     // await payCommission()
    // })

    // nodeSchedule.scheduleJob("*/10 * * * *", async (job) => {
    //     console.log("CRON checkAllPaymentPlisio")
    //     await OrderService.checkAllPaymentPlisio()
    // })

    nodeSchedule.scheduleJob("*/10 2 * * *", async (job) => {
        await payBinary()
        await approvePayBinary({})
    })

    nodeSchedule.scheduleJob("*/30 * * * *", async (job) => {
        const check: any = await Prisma.$queryRaw`SELECT y.* FROM ( 
            SELECT u.* FROM users u
            INNER JOIN \`order\` o ON o.user_id = u.id AND o.status = "done"
            INNER JOIN \`order_item\` oi ON oi.order_id = o.id
            INNER JOIN \`products\` p ON p.id = oi.product_id
            WHERE p.category_id > 1
            GROUP BY u.id
            ) as y
            LEFT JOIN strategy_binary sb ON sb.user_id = y.id
            WHERE sb.id IS NULL`;

        if (check) return;
        for (const b of (check || [])) {
            await addBinaryStrategy({ userId: b.id })
        }
    })


}