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
                name: `Bonus ${commission.category.name} Earnings`
                , wallet: (commission.category?.commission_pay_config as any)?.wallet || "MAIN"
                , user_id: commission.user_id
                , amount: commission.total.toNumber()
                , ref_type: 'commissionOrder'
                , ref_id: commission.id as any
                , extra_info: commission
                , identify: !commission.category ? null
                            : Number(commission.category.id) === 1 ? 'TOKENWAY_BONUS' 
                            : Number(commission.category.id) === 2 ? "TOKENONE_BONUS" 
                            : Number(commission.category.id) === 3 ? "TOKENTEEN_BONUS" 
                            : Number(commission.category.id) === 4 ? "WINWIN_BONUS" : null
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
    }, {
        maxWait: 10000000,
        timeout: 10000000
    })


}