import Prisma from "@/infra/db/prisma"
import { NotFoundError } from "@/presentations/errors/notFoundException"

export const filterUser = async (filter: any[] = [], pagination: any, orderBy: any = { created_at: "desc" }) => {
    const { page = 1, pageSize = 10 } = pagination

    const data = await Prisma.user.findMany({
        take: pageSize,
        skip: pageSize * (page - 1),
        where: {
            AND: filter
        },
    })

    if (!data) throw new NotFoundError("User not found")

    const total = await Prisma.user.count({
        where: {
            AND: filter
        },
    })

    return { data, metadata: { page, pageSize, total } }

}