import { WalletType } from "@prisma/client";
import Prisma from "../../infra/db/prisma"

export const addBalance = async ({ name = "", wallet, user_id, amount, ref_type, ref_id, extra_info = {} }: {
    name: string,
    wallet: WalletType,
    user_id: any,
    amount: number,
    ref_type: string,
    ref_id: number,
    extra_info?: any
}, db = Prisma) => {

    const extra: any = {}

    await db.$queryRawUnsafe(
        `SELECT * FROM balance WHERE user_id = ? AND wallet = ? FOR UPDATE`,
        user_id, wallet
    );

    const last = await db.balanceHistory.create({
        data: {
            name, direction: "CREDIT", wallet, user_id, amount, ref_type, ref_id, extra_info
        }
    })

    await db.balance.upsert({
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