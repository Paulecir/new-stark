import PrismaLocal from "@/infra/db/prisma"
import { addBalance } from "../balance/addBalance";
import moment from "moment";

export const approvePayCommission = async () => {

    await PrismaLocal.$transaction(async (Prisma) => {

        const commissions = await Prisma.commissionOrder.findMany({
            where: {
                status: "PENDING"
            },
            include: {
                category: true
            }
        })
        let ct = commissions.length
        for (const commission of commissions) {
            console.log("C", ct--)
            await addBalance({
                name: `Bonus ${commission.category.name} Earnings [0.55%]`
                , wallet: "MAIN"
                , user_id: commission.user_id
                , amount: commission.total.toNumber()
                , ref_type: 'commissionOrder'
                , ref_id: commission.id as any
                , extra_info: commission
            }, Prisma)
            await Prisma.commissionOrder.updateMany({
                where: {
                    id: commission.id
                },
                data: {
                    status: "PAYED"
                }

            })

            await Prisma.commission.updateMany({
                where: {
                    commission_order_id: commission.id
                },
                data: {
                    status: "PAYED"
                }
            })

        }
        throw new Error("ERROR")
    }, {
        maxWait: 1000000,
        timeout: 1000000
    })


}