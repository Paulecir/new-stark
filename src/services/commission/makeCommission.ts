import PrismaLocal from "@/infra/db/prisma"
import moment from "moment"

export const makeCommission = async () => {
    const commission = await PrismaLocal.commissionScheduler.findFirst({
        where: {
            status: "SCHEDULER",
            date: { lte: moment().toDate() },
        },
        orderBy: {
            date: 'asc'
        }
    })

    if (!commission) return false;
    try {
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
                        status: "done",
                    },
                    product: {
                        category_id: category.id
                    },
                    created_at: {
                        lte: commission.date
                    },
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
                let config = ((category.commission_yield_config as any)?.calendar || []).find(f => f.date === moment(commission.date).format("YYYY-MM-DD"))
                if (!config) {

                    await Prisma.commissionScheduler.update({
                        where: {
                            id: commission.id
                        },
                        data: {
                            status: "DONE",
                        }
                    })
                    return;
                }
                percent = parseFloat(config.value)
                
            }

            let maxDiff = 1

            if (category.commission_yield_type === "weekly") {
                maxDiff = 7
            } else if (category.commission_yield_type === "monthly") {
                maxDiff = moment(commission.date).endOf("month").date()
            }

            let insert = []
            for (const result of orderItems) {
                let diff = moment(commission.date).startOf("day").diff(moment(result.created_at).startOf("day"), "days")

                if (diff > maxDiff) {
                    diff = maxDiff
                }

                const total = ((result.amount.toNumber() * result.quantity) * (parseFloat(percent) / 100)) / maxDiff * diff

                insert.push({
                    scheduler_id: commission.id,
                    user_id: result.order.user_id,
                    order_item_id: result.id,
                    total,
                    diffDays: diff,
                    percent: parseFloat(percent.toString()),
                    amount: result.amount.toNumber() * result.quantity,
                    date: commission.date,
                    wallet_id: result.wallet_id
                })

                // await Prisma.commission.create(
                //     {
                //         data: {
                //             scheduler_id: commission.id,
                //             user_id: result.order.user_id,
                //             order_item_id: result.id,
                //             total,
                //             diffDays: diff,
                //             percent: parseFloat(percent.toString()),
                //             amount: result.amount.toNumber() * result.quantity,
                //             date: commission.date,
                //             wallet_id: result.wallet_id
                //         }
                //     })
            }

            do {
                const insertable = insert.splice(0, 1000)
                await Prisma.commission.createMany(
                    {
                        data: insertable,
                        skipDuplicates: true,
                    }
                )


            } while (insert.length > 0)

            const check = await Prisma.commissionScheduler.findFirst({
                where: {
                    id: commission.id
                }
            });

            if (check.status === "DONE") throw new Error("IS_DONE")
            await Prisma.commissionScheduler.update({
                where: {
                    id: commission.id
                },
                data: {
                    status: "DONE"
                }
            })

        }, {
            timeout: 100000000,
            maxWait: 100000000
        })
    } catch (err) {
        console.error("E", err)
        return false;
    } finally {
        return true;
    }

}