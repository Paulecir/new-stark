import PrismaLocal from "@/infra/db/prisma"
import { decBalance } from "@/services/balance/decBalance"
import moment from "moment"

export const payBinary = async (date: string = moment().subtract(1, "days").format('YYYY-MM-DD')) => {

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
                        wallet: "BINARY_RIGHT_POINT_NEW"
                    }
                })

                const balanceLeft = await Prisma.balance.findFirst({
                    where: {
                        user_id: strategy.user_id,
                        wallet: "BINARY_LEFT_POINT_NEW"
                    }
                })

                const balanceBinaryCeilingUser = await Prisma.$queryRaw`SELECT 
                    O.user_id,
                    sum(OI.amount * (C.binary_bonus_point_percent / 100)) as amount
                FROM 
                    order_item OI
                INNER JOIN \`order\` O ON O.id = OI.order_id
                INNER JOIN products P ON P.id = OI.product_id
                INNER JOIN categories C ON C.id = P.category_id
                WHERE P.category_id IN (2, 3, 4) AND O.user_id = ${strategy.user_id} AND O.status = "done"
                GROUP BY O.user_id
                `
                const categoryBinaryQualify = await Prisma.categoryItem.findFirst({
                    where: {
                        category_id: 4,
                        type: 'BINARY',
                        max_value: {
                            gte: balanceBinaryCeilingUser?.[0]?.amount.toNumber() || 0
                        }
                    },
                    orderBy: {
                        max_value: 'asc'
                    }
                })

                const amount: any = (balanceLeft?.amount.toNumber() || 0) < (balanceRight?.amount.toNumber() || 0) ? (balanceLeft?.amount.toNumber() || 0) : (balanceRight?.amount.toNumber() || 0)
                const direction = amount === 0 ? 'NONE' : (balanceLeft?.amount.toNumber() || 0) < (balanceRight?.amount.toNumber() || 0) ? "LEFT" : "RIGHT"
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
                        qualify: strategy.left_qualify && strategy.right_qualify && strategy.qualify,
                        mirror: strategy,
                        direction: direction
                    }
                })

                if (parseFloat(amount) > 0) {

                    await decBalance({
                        name: "Binary payment"
                        , wallet: "BINARY_RIGHT_POINT_NEW"
                        , user_id: binaryPay.user_id
                        , amount: parseFloat(amount)
                        , ref_type: 'strategyBinaryPay'
                        , ref_id: binaryPay.id
                        , extra_info: {
                            to: binaryPay?.user_id,
                            toName: current?.name,
                            toLogin: current?.login,
                            binaryId: binaryPay.binary_id,
                        }
                    }, Prisma)

                    await decBalance({
                        name: "Binary payment"
                        , wallet: "BINARY_LEFT_POINT_NEW"
                        , user_id: binaryPay.user_id
                        , amount: parseFloat(amount)
                        , ref_type: 'strategyBinaryPay'
                        , ref_id: binaryPay.id
                        , extra_info: {
                            to: binaryPay?.user_id,
                            toName: current?.name,
                            toLogin: current?.login,
                            binaryId: binaryPay.binary_id,
                        }
                    }, Prisma)

                }

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