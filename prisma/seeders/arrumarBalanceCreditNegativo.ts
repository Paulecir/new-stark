import Prisma from "../../src/infra/db/prisma";

async function arrumar() {

    const infos: any = await Prisma.$queryRaw`SELECT * FROM balance_history
   WHERE name = "Conceito corrección de binario" and direction = "CREDIT" and amount < 0`

    for (const info of infos) {
        console.log("I", info.amount, info.amount * -1 * 2)
        let amnt = info.amount * -1 * 2
        await Prisma.$transaction(async (Prisma) => {
            await Prisma.balanceHistory.update({
                where: {
                    id: info.id
                },
                data: {
                    amount: info.amount * -1
                }
            })

            await Prisma.balance.updateMany({
                where: {
                    user_id: info.user_id,
                    wallet: "MAIN",

                },
                data: {
                    amount: {
                        increment: amnt
                    }
                }
            })
        })

    }

}


arrumar()