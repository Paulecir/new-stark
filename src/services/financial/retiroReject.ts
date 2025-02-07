import PrismaLocal from "@/infra/db/prisma"
import { IFilter } from "@/presentations/interface/IFilter"

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

                await Prisma.withdraw.update({
                    where: {
                        id: approve.id
                    },
                    data: {
                        status: "REJECT",
                        obs: 'Rejeitado pelo administrador'

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
                    obs: 'Rejeitado pelo administrador'
                }
            })
        }

    }



    return null

}