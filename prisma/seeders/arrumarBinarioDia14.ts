import Prisma from "../../src/infra/db/prisma";
import moment from 'moment';

async function arrumar() {

    const balances = await Prisma.balanceHistory.findMany({
        where: {
            created_at: {
                gt: moment("2025-02-14T00:00:00").toDate()
            },
            wallet: {
                in: ["BINARY_RIGHT_POINT", "BINARY_LEFT_POINT"]
            }
        }
    })

    for (const balance of balances) {
        try {

            console.log("B", balance.user_id, balance.wallet)
            await Prisma.$transaction(async (db) => {
                await db.balance.updateMany({
                    where: {
                        user_id: balance.user_id,
                        wallet: balance.wallet
                    },

                    data: {
                        amount: {
                            increment: balance.amount.toNumber()
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
