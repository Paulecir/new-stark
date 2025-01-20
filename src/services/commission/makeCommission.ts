import PrismaLocal from "@/infra/db/prisma"

export const makeCommission = async () => {
    const commissions = await PrismaLocal.commissionScheduler.findMany({
        where: {
            status: "SCHEDULER"
        }
    })

    for (const commission of commissions) {
        await PrismaLocal.$transaction(async (Prisma) => {
            const resultados: any[] = await Prisma.$queryRaw`
            SELECT 
                o.user_id AS usuarioId, 
                SUM(oi.amount * oi.quantity) AS totalValor
            FROM 
                \`order_item\` oi
            INNER JOIN 
                \`order\` o 
                ON oi.order_id = o.id
            GROUP BY 
                o.user_id;
            `;
            console.log("??", resultados)
            for (const result of resultados) {
                try {
                    await Prisma.commission.create(
                        {
                            data: {
                                scheduler_id: commission.id,
                                user_id: result.usuarioId,
                                total: result.totalValor.toNumber(),
                                percent: commission.amount.toNumber(),
                                amount: result.totalValor.toNumber() * (commission.amount.toNumber() / 100),
                                date: commission.date
                            }
                        })
                } catch {}
               
            }

            await Prisma.commissionScheduler.update({
                where: {
                    id: commission.id
                },
                data: {
                    status: "DONE"
                }
            })

        }, { 
            timeout: 100000,
            maxWait: 100000
        })

    }

}