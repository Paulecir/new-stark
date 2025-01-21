import PrismaLocal from "@/infra/db/prisma"

export const makeCommissionOld = async () => {
    const commissions = await PrismaLocal.commissionScheduler.findMany({
        where: {
            status: "SCHEDULER"
        }
    })

    console.log("COM", commissions)

    throw new Error("OK")

    for (const commission of commissions) {
        await PrismaLocal.$transaction(async (Prisma) => {
            const category = await Prisma.category.findFirst({
                where: {
                    id: commission.category_id
                }
            })

            if (!category) {
                throw new Error("Categoria não encontrada")
            }

            let resultados = []
            switch (category.commission_yield_type) {
                case 'diary': {
                    resultados = await Prisma.$queryRaw`
                        SELECT 
                            o.user_id AS usuarioId, 
                            SUM(oi.amount * oi.quantity) AS totalValor,
                            SUM((oi.amount * oi.quantity) * (${commission.amount.toNumber()} / 100) ) AS amount
                        FROM 
                            \`order_item\` oi
                        INNER JOIN 
                            \`order\` o 
                            ON oi.order_id = o.id
                        WHERE
                            o.status = "DONE"
                        GROUP BY 
                            o.user_id;
                        `;
                    break;
                }
                case 'weekly':
                    resultados = await Prisma.$queryRaw`
                    SELECT 
                        o.user_id AS usuarioId, 
                        SUM(oi.amount * oi.quantity) AS totalValor,
                        SUM(
                            (
                                (oi.amount * oi.quantity) * (${commission.amount.toNumber()} / 100)
                            ) 
                            / 
                            ( 7 )
                            *
                            IF(DATEDIFF(NOW(), oi.created_at) > 7, 7, DATEDIFF(NOW(), oi.created_at))
                        ) AS amount
                    FROM 
                        \`order_item\` oi
                    INNER JOIN 
                        \`order\` o 
                        ON oi.order_id = o.id
                    WHERE 
                        o.status = "DONE"
                    GROUP BY 
                        o.user_id;
                    `;
                    break;
                case 'monthly':
                    resultados = await Prisma.$queryRaw`
                        SELECT 
                            o.user_id AS usuarioId, 
                            SUM(oi.amount * oi.quantity) AS totalValor,
                            SUM(
                                (
                                    (oi.amount * oi.quantity) * (${commission.amount.toNumber()} / 100)
                                ) 
                                / 
                                ( DAY(LAST_DAY(CURDATE())) )
                                *
                                IF(DATEDIFF(NOW(), oi.created_at) > DAY(LAST_DAY(CURDATE())), DAY(LAST_DAY(CURDATE())), DATEDIFF(NOW(), oi.created_at))
                            ) AS amount
                        FROM 
                            \`order_item\` oi
                        INNER JOIN 
                            \`order\` o 
                            ON oi.order_id = o.id
                        WHERE
                            o.status = "DONE"
                        GROUP BY 
                            o.user_id;
                        `;
                    break;
            }

            for (const result of resultados) {
                try {
                    await Prisma.commission.create(
                        {
                            data: {
                                scheduler_id: commission.id,
                                user_id: result.usuarioId,
                                total: result.totalValor.toNumber(),
                                percent: commission.amount.toNumber(),
                                amount: Number(result.amount),
                                date: commission.date
                            }
                        })
                } catch { }

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