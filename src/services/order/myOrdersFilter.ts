import PrismaLocal from "@/infra/db/prisma"
import { NotFoundError } from "@/presentations/errors/notFoundException"
import { IFilter } from "@/presentations/interface/IFilter"

export const myOrdersFilter = async (
    {
        filter: { wallet },
        pagination = {},
        orderBy = { created_at: "desc" },
        user
    }: IFilter
    , Prisma = PrismaLocal
) => {
    const { page = 1, pageSize = 10 } = pagination
    const data = await Prisma.order.findMany({
        take: pageSize,
        skip: pageSize * (page - 1),
        where: {
            AND: [
                { user_id: user.id }
            ]
        },
        orderBy
    })
    if (!data) throw new NotFoundError("Hitory not found")

    const total = await Prisma.order.count({
        where: {
            AND: [
                { user_id: user.id }
            ]
        },
    })

    return { data, metadata: { page, pageSize, total } }

}