import PrismaLocal from "@/infra/db/prisma"
import { addBalance } from "@/services/balance/addBalance"
import { decBalance } from "@/services/balance/decBalance"
import moment from "moment"

export const payBinary = async () => {

    const date = moment().format('YYYY-MM-DD')

    let info = null
    do {
        info = await PrismaLocal.$transaction(async (Prisma) => {
            const strategy = await Prisma.strategyBinary.findFirst({
                where: {
                    OR: [
                        { date_check: null },
                        { date_check: { not: date } }
                    ]

                }
            })

            if (!strategy) return null;

            const current = await Prisma.user.findFirst({
                where: {
                    id: strategy.user_id
                }
            })

            try {
                const balanceRight = await Prisma.balance.findFirst({
                    where: {
                        user_id: strategy.user_id,
                        wallet: "BINARY_RIGHT_POINT"
                    }
                })

                const balanceLeft = await Prisma.balance.findFirst({
                    where: {
                        user_id: strategy.user_id,
                        wallet: "BINARY_LEFT_POINT"
                    }
                })

                const balanceBinaryCeilingUser = await Prisma.balance.findFirst({
                    where: {
                        user_id: strategy.user_id,
                        wallet: "BINARY_CEILING_USER"
                    }
                })

                const categoryBinaryQualify = await Prisma.categoryItem.findFirst({
                    where: {
                        category: {
                            binary_bonus_qualify: true
                        },
                        max_value: {
                            lte: balanceBinaryCeilingUser?.amount || 0
                        }
                    },
                    orderBy: {
                        max_value: 'asc'
                    }
                })

                const amount: any = (balanceLeft?.amount || 0) < (balanceRight?.amount || 0) ? (balanceLeft?.amount || 0) : (balanceRight?.amount || 0)
                const amountCalc: any = parseFloat(amount) * 0.1
                const amountCeilingUser = categoryBinaryQualify?.level_values[0] || 0

                const binaryPay = await Prisma.strategyBinaryPay.create({
                    data: {
                        date,
                        binary_id: strategy.id,
                        user_id: strategy.user_id,
                        points: amount,
                        amount: amountCalc,
                        amountCeilingUser: amountCalc > amountCeilingUser ? amountCeilingUser : amountCalc,
                        qualify: strategy.left_qualify && strategy.right_qualify,
                        mirror: strategy
                    }
                })

                await decBalance({
                    name: "Binary payment"
                    , wallet: "BINARY_RIGHT_POINT"
                    , user_id: strategy.id
                    , amount: parseFloat(amount)
                    , ref_type: 'strategyBinaryPay'
                    , ref_id: binaryPay.id
                    , extra_info: {
                        to: strategy?.id,
                        toName: current?.name,
                        toLogin: current?.login,
                        binaryId: strategy.id,
                    }
                }, Prisma)

                await decBalance({
                    name: "Binary payment"
                    , wallet: "BINARY_LEFT_POINT"
                    , user_id: strategy.id
                    , amount: parseFloat(amount)
                    , ref_type: 'strategyBinaryPay'
                    , ref_id: binaryPay.id
                    , extra_info: {
                        to: strategy?.id,
                        toName: current?.name,
                        toLogin: current?.login,
                        binaryId: strategy.id,
                    }
                }, Prisma)

                await Prisma.strategyBinary.update({
                    where: {
                        id: strategy.id
                    },
                    data: {
                        // left_point: {
                        //     decrement: amount.toNumber()
                        // },
                        // right_point: {
                        //     decrement: amount.toNumber()
                        // },
                        date_check: date
                    }
                })
            } catch (err) {
                await Prisma.strategyBinary.update({
                    where: {
                        id: strategy.id
                    },
                    data: {
                        date_check: date
                    }
                })
                // if (err.code === "P2002") {
                //     await Prisma.strategyBinary.update({
                //         where: {
                //             id: strategy.id
                //         },
                //         data: {
                //             date_check: date
                //         }
                //     })
                // }
                console.log("E", err)
            }

            return strategy;
        }, {
            timeout: 100000,
            maxWait: 100000
        })

        if (!info) break

    } while (info)

    // do {

    // } while()

}