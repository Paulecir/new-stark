import Prisma from "@/infra/db/prisma"
import { CommissionService } from "@/services/commission"
import { makeCommission } from "@/services/commission/makeCommission"
import { payCommission } from "@/services/commission/payCommission"
import { OrderService } from "@/services/order"
import nodeSchedule from "node-schedule"

export const initCronjob = () => {
    console.log("START CRON")
    nodeSchedule.scheduleJob("* 10 22 * * *", async (job) => {
        const categories = await Prisma.category.findMany()

        for (const category of categories) {
            await Prisma.$transaction(async (tx) => await CommissionService.createScheduler({
                category_id: category.id, type: "COMMISSION"
            }, tx), { timeout: 10000, maxWait: 10000 })
        }
    })

    nodeSchedule.scheduleJob("*/10 * * * *", async (job) => {
        await makeCommission()
        await payCommission()
    })

    nodeSchedule.scheduleJob("*/5 * * * *", async (job) => {
        console.log("CRON checkAllPaymentPlisio")
        await OrderService.checkAllPaymentPlisio()
    })
}