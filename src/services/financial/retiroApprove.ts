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
                await Prisma.withdraw.update({
                    where: {
                        id: approve.id
                    },
                    data: {
                        status: "SCHEDULER",
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