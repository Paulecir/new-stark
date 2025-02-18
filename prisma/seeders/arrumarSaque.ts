import Prisma from "../../src/infra/db/prisma";

async function arrumar() {

    const balanceHistory: any = await Prisma.$queryRaw`SELECT 
    * 
FROM 
    withdraw 

INNER JOIN balance_history BH ON BH.ref_id = withdraw.id AND ref_type ="withdraw"
WHERE 
    withdraw.status = "SCHEDULER" and withdraw.created_at < "2025-02-02T00:00:00"`

    console.log("?", balanceHistory)
    for (const bh of balanceHistory) {

        await Prisma.$transaction(async (db) => {
            await db.balance.updateMany({
                where: {
                    wallet: 'MAIN',
                    user_id: bh.user_id
                },
                data: {
                    amount: {
                        increment: bh.amount.toNumber()
                    }
                }
            })

            await db.balanceHistory.delete({
                where: {
                    id: bh.id
                }
            })
        })


        console.log("B", bh.id, bh.amount)

    }

}


arrumar()