import PrismaLocal from "@/infra/db/prisma"
import { addBalance } from "../balance/addBalance";
import moment from "moment";

export const payCommission = async () => {

    await PrismaLocal.$transaction(async (Prisma) => {
        const commissions: any[] = await PrismaLocal.$queryRaw`
            SELECT 
                c.user_id,
                c.scheduler_id,
                sum(c.amount) as amount
            FROM 
                commission as c
            WHERE
                c.status = 'PENDING'
            GROUP BY user_id, scheduler_id
        `;


        let ct = commissions.length

        for (const commission of commissions) {
            console.log("->", ct--)
            const order = await Prisma.commissionOrder.create({
                data: {
                    obs: "",
                    total: commission.amount,
                    user_id: commission.user_id,
                    date_ref: moment().format()
                }
            })

            await Prisma.commission.updateMany({
                where: {
                    user_id: commission.user_id,
                    scheduler_id: commission.scheduler_id,
                    status: "PENDING"
                },
                data: {
                    commission_order_id: order.id,
                    status: "ASSOCIATED"
                }
            })

        }

    }, {
        maxWait: 1000000,
        timeout: 1000000
    })


}