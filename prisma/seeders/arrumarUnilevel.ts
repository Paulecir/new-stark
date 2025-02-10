import Prisma from "../../src/infra/db/prisma";

async function arrumar() {

    const balanceHistory = await Prisma.balanceHistory.findMany({
        where: {
            name: {
                startsWith: "Win win Unilevel",
            },
            wallet: "MAIN"
        }
    })

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


        console.log("B", bh.amount)

    }

}


arrumar()