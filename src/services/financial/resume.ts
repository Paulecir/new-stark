import PrismaLocal from "@/infra/db/prisma"
import { NotFoundError } from "@/presentations/errors/notFoundException"
import { IFilter } from "@/presentations/interface/IFilter"

export const resume = async (
    {
        filter: { wallet },
        user
    }: IFilter
    , Prisma = PrismaLocal
) => {
    const data = await Prisma.balance.findMany({
        where: {
            AND: [
                { wallet: { in: wallet } },
                { user_id: user.id }
            ]
        }
    })
    if (!data) throw new NotFoundError("Hitory not found")

    const total = await Prisma.balanceHistory.count({
        where: {
            AND: [
                { wallet: { in: wallet } },
                { user_id: user.id }
            ]
        },
    })

    return { data }

}