import Prisma from "@/infra/db/prisma"
import { CommissionService } from "@/services/commission"
import { makeCommission } from "@/services/commission/makeCommission"
import { payCommission } from "@/services/commission/payCommission"
import { OrderService } from "@/services/order"
import { approvePayBinary } from "@/services/strategies/binary/approvePayBinary"
import { payBinary } from "@/services/strategies/binary/payBinary"
import nodeSchedule from "node-schedule"

export const initCronjob = async () => {

    if (process.env.CRONJOB !== "true") return;
    
    let rule = new nodeSchedule.RecurrenceRule();
    rule.tz = "America/Sao_Paulo"
    console.log("START CRON")
    nodeSchedule.scheduleJob("10 22 * * *", async (job) => {
        const categories = await Prisma.category.findMany()

        for (const category of categories) {
            await Prisma.$transaction(async (tx) => await CommissionService.createScheduler({
                category_id: category.id, type: "COMMISSION"
            }, tx), { timeout: 10000, maxWait: 10000 })

            await Prisma.$transaction(async (tx) => await CommissionService.createScheduler({
                category_id: category.id, type: "RESIDUAL"
            }, tx), { timeout: 10000, maxWait: 10000 })
        }
    })

    nodeSchedule.scheduleJob("*/10 * * * *", async (job) => {
        await makeCommission()
        await payCommission()
    })

    nodeSchedule.scheduleJob("*/1 * * * *", async (job) => {
        console.log("CRON checkAllPaymentPlisio")
        await OrderService.checkAllPaymentPlisio()
    })

    nodeSchedule.scheduleJob("0 1 * * *", async (job) => {
        await payBinary()
        await approvePayBinary()
    })

}