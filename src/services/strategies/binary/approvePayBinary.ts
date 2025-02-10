import PrismaLocal from "@/infra/db/prisma"
import { addBalance } from "@/services/balance/addBalance"
import { decBalance } from "@/services/balance/decBalance"
import moment from "moment"

export const approvePayBinary = async ({ date = moment().subtract(1, "days").format('YYYY-MM-DD') }) => {

    const startDate = moment(date).startOf("day").subtract(1, "day").startOf("day").toDate()
    const endDate = moment(date).startOf("day").subtract(1, "day").endOf("day").toDate()

    const total = await PrismaLocal.strategyBinaryPay.aggregate({
        where: {
            status: "PENDING",
            date
        },
        _sum: {
            amountCeilingUser: true
        }
    })

    const totalSell = await PrismaLocal.orderItem.aggregate({
        where: {
            order: {
                status: "done"
            },
            created_at: {
                gte: startDate,
                lte: endDate
            }
        },
        _sum: {
            amount: true
        }
    })

    let percent = 100

    let totalSellAmount = totalSell._sum.amount.toNumber() * 0.25

    if (totalSellAmount < total._sum.amountCeilingUser?.toNumber() || 0) {
        percent = ((total._sum.amountCeilingUser?.toNumber() || 0) * 100) / totalSellAmount
    }

    if (percent > 100) percent = 100

    let strategyPay = null

    do {

        strategyPay = await PrismaLocal.$transaction(async (Prisma) => {
            const strategyPay = await Prisma.strategyBinaryPay.findFirst({
                where: {
                    status: "PENDING",
                    date
                },
    
                orderBy: {
                    id: "asc"
                }
            })
            try {

                if (!strategyPay) return null

                const current = await Prisma.user.findFirst({
                    where: {
                        id: strategyPay.user_id
                    }
                })

                // const 

                const amountTotalCeiling = strategyPay.amountCeilingUser.toNumber() * (percent / 100)

                if (amountTotalCeiling > 0 && strategyPay.qualify) {
                    await addBalance({
                        name: `Bonus Binary [${strategyPay.date}]`
                        , wallet: "MAIN"
                        , user_id: strategyPay.user_id
                        , amount: parseFloat(amountTotalCeiling.toString())
                        , ref_type: 'strategyBinaryPay'
                        , ref_id: strategyPay.id
                        , extra_info: {
                            to: strategyPay?.id,
                            toName: current?.name,
                            toLogin: current?.login,
                        }
                    }, Prisma)
                    await addBalance({
                        name: `Bonus Binary [${strategyPay.date}]`
                        , wallet: "BINARY_BONUS"
                        , user_id: strategyPay.user_id
                        , amount: parseFloat(amountTotalCeiling.toString())
                        , ref_type: 'strategyBinaryPay'
                        , ref_id: strategyPay.id
                        , extra_info: {
                            to: strategyPay?.id,
                            toName: current?.name,
                            toLogin: current?.login,
                        }
                    }, Prisma)

                    if (strategyPay.direction !== "NONE") {
                        await addBalance({
                            name: `Bonus Binary [${strategyPay.date}]`
                            , wallet: strategyPay.direction === "LEFT" ? "BINARY_LEFT_POINT_PAY" : "BINARY_RIGHT_POINT_PAY"
                            , user_id: strategyPay.user_id
                            , amount: parseFloat(amountTotalCeiling.toString())
                            , ref_type: 'strategyBinaryPay'
                            , ref_id: strategyPay.id
                            , extra_info: {
                                to: strategyPay?.id,
                                toName: current?.name,
                                toLogin: current?.login,
                            }
                        }, Prisma)
                    }

                }

                await Prisma.strategyBinaryPay.updateMany({
                    where: {
                        id: strategyPay.id
                    },
                    data: {
                        amountPayed: parseFloat(amountTotalCeiling.toString()),
                        amountTotalCeiling,
                        percentTotalCeiling: percent,
                        status: strategyPay.qualify ? 'PAYED' : "NOTQUALIFY"
                    }
                })

            } catch (err) {
                await Prisma.strategyBinaryPay.updateMany({
                    where: {
                        status: "PENDING",
                        date
                    },
                    data: {
                        status: 'ERROR'
                    }
                })
            } finally {
                return strategyPay
            }

        }, {
            timeout: 100000,
            maxWait: 100000
        })

        if (!strategyPay) break;


    } while (strategyPay)


}