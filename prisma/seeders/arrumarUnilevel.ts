import Prisma from "../../src/infra/db/prisma";

async function arrumar() {

    const balanceHistory: any = await Prisma.$queryRaw`SELECT
    *
FROM
  balance_history
WHERE
    name like "Token W%[1º%" and status = "ACTIVE"`

    for (const bh of balanceHistory) {

        await Prisma.$transaction(async (db) => {
            await db.balance.updateMany({
                where: {
                    wallet: 'MAIN',
                    user_id: bh.user_id
                },
                data: {
                    amount: {
                        decrement: bh.amount.toNumber()
                    }
                }
            })

            await db.balanceHistory.delete({
                where: {
                    id: bh.id
                }
            })
        })

    }
    //     console.log("B", bh.amount)

    // }

}


arrumar()