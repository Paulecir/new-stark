import { BalanceService } from "."
import Prisma from "../../infra/db/prisma"

export const addBalanceToUser = async ({ amount, description, user_id }: any, releasedBy, db = Prisma) => {

    const balanceOrder = await db.balanceOrder.create({
        data: {
            amount,
            description,
            released_by_id: releasedBy.id,
            user_id,
        }
    })

    await BalanceService.addBalance({
        amount,
        name: "Add credit",
        ref_id: balanceOrder.id,
        ref_type: "balanceOrder",
        user_id,
        wallet: "MAIN"
    })
    
    return balanceOrder

}