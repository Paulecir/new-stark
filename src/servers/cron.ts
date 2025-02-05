import Prisma from "@/infra/db/prisma"
import { CommissionService } from "@/services/commission"
import { makeCommission } from "@/services/commission/makeCommission"
import { OrderService } from "@/services/order"
import { payBinary } from "@/services/strategies/binary/payBinary"
import nodeSchedule from "node-schedule"

export const initCronjob = async () => {
    console.log("INIT")
   

    if (process.env.CRONJOB !== "true") return;
    console.log("START CRON")

    let rule = new nodeSchedule.RecurrenceRule();
    rule.tz = "America/Sao_Paulo"
    rule.hour = 22
    rule.minute = 10

    nodeSchedule.scheduleJob("1 22 * * *", async (job) => {
        const categories = await Prisma.category.findMany()

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

    nodeSchedule.scheduleJob("*/1 * * * *", async (job) => {
        console.log("CRON checkAllPaymentPlisio")
        await OrderService.checkAllPaymentPlisio()
    })

    nodeSchedule.scheduleJob("*/10 1 * * *", async (job) => {
        await payBinary()
        console.log("PAY BINARY")
        // await approvePayBinary()
    })

}