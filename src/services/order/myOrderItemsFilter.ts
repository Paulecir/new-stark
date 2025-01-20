import PrismaLocal from "@/infra/db/prisma"
import { NotFoundError } from "@/presentations/errors/notFoundException"
import { IFilter } from "@/presentations/interface/IFilter"

export const myOrderItemsFilter = async (
    {
        filter: { wallet },
        pagination = {},
        orderBy = { created_at: "desc" },
        user
    }: IFilter
    , Prisma = PrismaLocal
) => {
    const { page = 1, pageSize = 10 } = pagination
    const data = await Prisma.orderItem.findMany({
        take: pageSize,
        skip: pageSize * (page - 1),
        where: {
            AND: [
                { order: { user_id: user.id } }
            ]
        },
        include: {
            product: {
                select: {
                    id: true,
                    name: true
                }
            },
            order: {
                select: {
                    status: true
                }
            }
        },
        orderBy
    })
    if (!data) throw new NotFoundError("History not found")

    const total = await Prisma.orderItem.count({
        where: {
            AND: [
                { order: { user_id: user.id } }
            ]
        },
    })

    return {
        data: data.map(m => {
            return {
                ...m,
                total: m.amount.toNumber() * m.quantity
            }
        }), metadata: { page, pageSize, total }
    }

}