import PrismaLocal from "@/infra/db/prisma"
import { addBalance } from "../balance/addBalance";

export const approveCommission = async (data: any) => {

    const orders = await PrismaLocal.commissionOrder.findMany({
        where: {
            id: { in: data.orders }
        }
    })

    for (const order of orders) {

        await PrismaLocal.$transaction(async (Prisma) => {
            const commissions = await Prisma.commission.groupBy({
                by: ["wallet_id"],
                _sum: {
                    amount: true
                },
                where: {
                    commission_order_id: order.id,
                    status: "ASSOCIATED"
                },
            })

            for (const payment of commissions) {
                switch (payment.wallet_id) {
                    case null: {

                        break;
                    }
                    default: {
                        break;
                    }
                }

                await addBalance({
                    name: "Commission approbe"
                    , wallet: "MAIN"
                    , user_id: order.user_id
                    , amount: payment._sum.amount.toNumber()
                    , ref_type: 'commissionOrder'
                    , ref_id: order.id
                    , extra_info: {
                    }
                })

                await Prisma.commission.updateMany({
                    where: {
                        commission_order_id: order.id,
                        status: "ASSOCIATED",
                        wallet_id: payment.wallet_id
                    },
                    data: {
                        status: "PAYED"
                    }
                })
            }

            await Prisma.commissionOrder.updateMany({
                where: {
                    id: order.id,
                },
                data: {
                    status: "PAYED"
                }
            })
        })
    }

}