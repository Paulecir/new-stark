import PrismaLocal from "@/infra/db/prisma"
import { addBalance } from "../balance/addBalance";

export const payCommission = async () => {

    await PrismaLocal.$transaction(async (Prisma) => {
        const commissions: any[] = await PrismaLocal.$queryRaw`
        SELECT 
            c.user_id,
            c.scheduler_id,
            sum(c.amount) as amount
        FROM 
            commission as c
        GROUP BY user_id, scheduler_id
    `;

        for (const commission of commissions) {
            const balance = await addBalance({
                name: "Commision"
                , wallet: "MAIN"
                , user_id: commission.user_id
                , amount: parseFloat(commission.amount.toString())
                , ref_type: 'commissions'
                , ref_id: null
                , extra_info: {
                    user_id: commission.user_id,
                    scheduler_id: commission.scheduler_id,
                }
            }, Prisma)

            await Prisma.commission.updateMany({
                where: {
                    user_id: commission.user_id
                },
                data: {
                    status: "PAYED",
                    balance_history_id: balance.id
                }
            })

        }
       
    }, {
        maxWait: 100000,
        timeout: 100000
    })


}