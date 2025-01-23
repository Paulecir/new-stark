import PrismaLocal from "@/infra/db/prisma"
import moment from "moment"

export const makeCommission = async () => {
    const commissions = await PrismaLocal.commissionScheduler.findMany({
        where: {
            status: "SCHEDULER",
            date: { lte: new Date() }
        }
    })

    for (const commission of commissions) {
        await PrismaLocal.$transaction(async (Prisma) => {
            const category = await Prisma.category.findFirst({
                where: {
                    id: commission.category_id
                }
            })

            if (!category) {
                throw new Error("Categoria não encontrada")
            }

            const orderItems = await Prisma.orderItem.findMany({
                where: {
                    order: {
                        status: "done"
                    },
                    product: {
                        category_id: category.id
                    }
                    //TODO: Colocar data
                },
                include: {
                    order: true
                }
            })



            let percent: any = (category.commission_yield_config as any)?.yield_fixed || 0

            if (category.commission_yield_type_commission === "dynamic") {
                percent = (category.commission_yield_config as any)?.min || 0
            }

            if (category.commission_yield_type_commission === "dynamic") {
                let config = ((category.commission_yield_config as any)?.calendar || []).find(f => f.date === moment().format("YYYY-MM-DD"))
                if (config) percent = parseFloat(config.value)
            }

            let maxDiff = 1

            if (category.commission_yield_type === "weekly") {
                maxDiff = 7
            } else if (category.commission_yield_type === "monthly") {
                maxDiff = moment(commission.date).endOf("month").date()
            }

            for (const result of orderItems) {
                let diff = moment(commission.date).diff(moment(result.created_at), "days")
                console.log(diff)

                if (diff > maxDiff) {
                    diff = maxDiff
                }

                const total = ((result.amount.toNumber() * result.quantity) * (parseFloat(percent) / 100)) / maxDiff * diff

                await Prisma.commission.create(
                    {
                        data: {
                            scheduler_id: commission.id,
                            user_id: result.order.user_id,
                            order_item_id: result.id,
                            total,
                            diffDays: diff,
                            percent: parseFloat(percent.toString()),
                            amount: result.amount.toNumber() * result.quantity,
                            date: commission.date,
                            wallet_id: result.wallet_id
                        }
                    })
            }

            await Prisma.commissionScheduler.update({
                where: {
                    id: commission.id
                },
                data: {
                    status: "DONE"
                }
            })

        }, {
            timeout: 100000,
            maxWait: 100000
        })

    }

}