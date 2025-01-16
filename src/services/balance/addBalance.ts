import Prisma from "../../infra/db/prisma"

export const addBalance = async ({ name = "", wallet, user_id, amount, ref_type, ref_id, extra_info = {} }: any, db = Prisma) => {

    const extra: any = {}

    const last = await db.balanceHistory.create({
        data: {
            name, direction: "CREDIT", wallet, user_id, amount, ref_type, ref_id, extra_info
        }
    })

    const balance = await db.balance.upsert({
        where: {
            balanceId: {
                user_id: user_id,
                wallet
            }
        },
        create: {
            user_id: user_id,
            wallet,
            amount,
        },
        update: {
            amount: {
                increment: amount
            },
        }
    })

    return last

}