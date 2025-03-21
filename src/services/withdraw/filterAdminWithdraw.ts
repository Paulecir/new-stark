import Prisma from "@/infra/db/prisma"
import { NotFoundError } from "@/presentations/errors/notFoundException"

export const filterAdminWithdraw = async (filter: any[] = [], pagination: any, orderBy: any = { created_at: "desc" }) => {
    const { page = 1, pageSize = 10 } = pagination

    const data = await Prisma.withdraw.findMany({
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
                    email: true,
                    login: true
                }
            }
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