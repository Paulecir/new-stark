import PrismaLocal from "@/infra/db/prisma"
import { IFilter } from "@/presentations/interface/IFilter"
import { addBalance } from "../balance/addBalance"

export const retiroReject = async (
    {
        filter: { ids },
    }: IFilter
) => {
    const approves = await PrismaLocal.withdraw.findMany({
        where: {
            id: { in: ids },
            status: "PENDING"
        },
        include: {
            user: {
                select: {
                    id: true,
                    name: true,
                    login: true
                }
            }
        }
    })

    for (const approve of approves) {
        try {
            await PrismaLocal.$transaction(async (Prisma) => {

                const withdraw = await Prisma.withdraw.update({
                    where: {
                        id: approve.id
                    },
                    include: {
                        user: true
                    },
                    data: {
                        status: "REJECT",
                        obs: 'Rejeitado pelo administrador'

                    }
                })

                if (!withdraw) return;

                await addBalance({
                    name: "Reversión de retiro"
                    , wallet: "MAIN"
                    , user_id: withdraw.user_id
                    , amount: withdraw.amount.toNumber()
                    , ref_type: 'withdraw'
                    , ref_id: parseFloat(withdraw.id.toString())
                    , extra_info: {
                        to: withdraw.user_id,
                        toName: withdraw.user?.name,
                        toLogin: withdraw.user?.login,
                    }
                }, Prisma)

            }, {
                timeout: 100000
                , maxWait: 100000
            })
        } catch (err) {
            console.error("E", err)
            // await PrismaLocal.withdraw.update({
            //     where: {
            //         id: approve.id
            //     },
            //     data: {
            //         status: "REJECT",
            //         obs: 'Rejeitado pelo administrador'
            //     }
            // })
        }

    }



    return null

}