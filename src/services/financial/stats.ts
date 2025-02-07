import PrismaLocal from "@/infra/db/prisma"
import { NotFoundError } from "@/presentations/errors/notFoundException"
import { IFilter } from "@/presentations/interface/IFilter"

export const stats = async (
    {
    }
    , Prisma = PrismaLocal
) => {
    const data = await Prisma.withdraw.aggregate({
        where: {
            status: "SCHEDULER"
        },
        _sum: {
            amount: true
        }
    })
   
    return { withdraw: data._sum?.amount || 0 }

}