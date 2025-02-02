import PrismaLocal from "@/infra/db/prisma"
import { NotFoundError } from "@/presentations/errors/notFoundException"
import { IFilter } from "@/presentations/interface/IFilter"
import { decBalance } from "../balance/decBalance"

export const retiroApprove = async (
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

                const history = await decBalance({
                    name: "Withdraw"
                    , wallet: "MAIN"
                    , user_id: approve.user_id
                    , amount: approve.amount.toNumber()
                    , ref_type: 'withdraw'
                    , ref_id: approve.id
                    , extra_info: {
                        to: approve.user_id,
                        toName: approve.user?.name,
                        toLogin: approve.user?.login,
                    }
                }, Prisma)


                // Send withdraw
                throw new Error("Falta meio de pagamento")
                await Prisma.withdraw.update({
                    where: {
                        id: approve.id
                    },
                    data: {
                        status: "PAYED",
                        balance_history_id: history.id
                    }
                })

            }, {
                timeout: 100000
                , maxWait: 100000
            })
        } catch (err) {
            await PrismaLocal.withdraw.update({
                where: {
                    id: approve.id
                },
                data: {
                    status: "REJECT",
                    obs: "Não possui saldo suficiante"
                }
            })
        }

    }



    return null

}