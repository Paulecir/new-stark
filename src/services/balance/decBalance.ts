import Prisma from "../../infra/db/prisma"

export const decBalance = async ({ name = "", wallet, user_id, amount, ref_type, ref_id, identify = null }: any, db = Prisma, force = false) => {

    await db.$queryRawUnsafe(
        `SELECT * FROM balance WHERE user_id = ? AND wallet = ? FOR UPDATE`,
        user_id, wallet
    );

    const lastBalance = await db.balance.findFirst({
        where: {
            user_id: user_id,
            wallet
        },
    })

    const last = await db.balanceHistory.create({
        data: {
            name, direction: "DEBIT", wallet, user_id, amount, ref_type, ref_id, last_balance: lastBalance?.amount || 0, identify
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

    if (balance.amount.toNumber() < 0 && !force) {
        throw new Error("INSUFICIENT_FUNDS")
    }

    return last
}