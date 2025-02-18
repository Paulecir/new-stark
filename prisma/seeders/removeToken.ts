import Prisma from "../../src/infra/db/prisma";
import moment from 'moment';

async function arrumar() {

    const balances = await Prisma.balanceHistory.findMany({
        where: {
            created_at: {
                gt: moment("2025-02-03T00:00:00").toDate()
            },
            name: {
                startsWith: "Bonus Binary"
            }
        }
    })

    for (const balance of balances) {
        try {
            await Prisma.$transaction(async (db) => {
                await db.balance.updateMany({
                    where: {
                        wallet: balance.wallet,
                        user_id: balance.user_id
                    },
                    data: {
                        amount: {
                            decrement: balance.amount.toNumber()
                        }
                    }
                })
    
                await db.balanceHistory.delete({
                    where: {
                        id: balance.id
                    }
                })
            })
        } catch {

        }
        
    }
}


arrumar()
