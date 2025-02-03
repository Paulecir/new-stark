import Prisma from "@/infra/db/prisma"
import { NotFoundError } from "@/presentations/errors/notFoundException"

export const filterWithdraw = async (filter: any[] = [], pagination: any, orderBy: any = { created_at: "desc" }) => {
    const { page = 1, pageSize = 10 } = pagination

    const data = await Prisma.withdraw.findMany({
        take: pageSize,
        skip: pageSize * (page - 1),
        where: {
            AND: filter
        },
        orderBy
    })

    if (!data) throw new NotFoundError("Withdraw not found")

    const total = await Prisma.withdraw.count({
        where: {
            AND: filter
        },
    })

    return { data, metadata: { page, pageSize, total } }

}