import PrismaLocal from "@/infra/db/prisma"
import { NotFoundError } from "@/presentations/errors/notFoundException"
import { IFilter } from "@/presentations/interface/IFilter"

export const filterExtract = async (
    {
        filter: { wallet },
        pagination = {},
        orderBy = { created_at: "desc" },
        user
    }: IFilter
    , Prisma = PrismaLocal
) => {
    const { page = 1, pageSize = 10 } = pagination
    const data = await Prisma.balanceHistory.findMany({
        take: pageSize,
        skip: pageSize * (page - 1),
        where: {
            AND: [
                { wallet: { in: wallet } },
                { user_id: user.id },
                { status: "ACTIVE" }
            ]
        },
        orderBy
    })
    if (!data) throw new NotFoundError("Hitory not found")

    const total = await Prisma.balanceHistory.count({
        where: {
            AND: [
                { wallet: { in: wallet } },
                { user_id: user.id },
                { status: "ACTIVE" }
            ]
        },
    })

    return { data, metadata: { page, pageSize, total } }

}