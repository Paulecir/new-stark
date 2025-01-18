import Prisma from "../../infra/db/prisma"

export const decBalance = async ({ name = "", wallet, user_id, amount, ref_type, ref_id }: any, db = Prisma) => {

    const last = await db.balanceHistory.create({
        data: {
            name, direction: "DEBIT", wallet, user_id, amount, ref_type, ref_id
        }
    })

    amount = amount * -1

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

    if (balance.amount.toNumber() < 0) {
        console.log("F", { name, wallet, user_id, amount, ref_type, ref_id })
        throw new Error("INSUFICIENT_FUNDS")
    }

    return last
}