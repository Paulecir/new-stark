import PrismaLocal from "@/infra/db/prisma"
import { NotFoundError } from "@/presentations/errors/notFoundException"
import { IFilter } from "@/presentations/interface/IFilter"

export const ordersFilter = async (
    {
        filter,
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
            AND: filter
        },
        include: {
            user: {
                select: {
                    id: true,
                    name: true,
                    login: true,
                    email: true
                }
            }
        },
        orderBy
    })
    if (!data) throw new NotFoundError("Order not found")

    const total = await Prisma.order.count({
        where: {
            AND: filter
        },
    })

    return { data, metadata: { page, pageSize, total } }

}