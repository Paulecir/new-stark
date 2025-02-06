import Prisma from "@/infra/db/prisma"
import { NotFoundError } from "@/presentations/errors/notFoundException"

export const filterOrderBalance = async (filter: any[] = [], pagination: any, orderBy: any = { created_at: "desc" }) => {
    const { page = 1, pageSize = 10 } = pagination

    const data = await Prisma.balanceOrder.findMany({
        take: pageSize,
        skip: pageSize * (page - 1),
        where: {
            AND: filter
        },
    })

    if (!data) throw new NotFoundError("Balance order not found")

    const total = await Prisma.balanceOrder.count({
        where: {
            AND: filter
        },
    })

    return { data, metadata: { page, pageSize, total } }

}