import Prisma from "@/infra/db/prisma"
import { NotFoundError } from "@/presentations/errors/notFoundException"

export const filterUser = async (filter, pagination: any, orderBy: any = { created_at: "desc" }) => {
    const { page = 1, pageSize = 10 } = pagination

    let query: any[] = []

    if (filter.name) query.push({ name: { contains: filter.name } })
    if (filter.email) query.push({ email: { contains: filter.name } })
    if (filter.login) query.push({ login: { contains: filter.name } })

    const data = await Prisma.user.findMany({
        take: pageSize,
        skip: pageSize * (page - 1),
        where: {
            AND: query,
        },
    })

    if (!data) throw new NotFoundError("User not found")

    const total = await Prisma.user.count({
        where: {
            AND: query
        },
    })

    return { data, metadata: { page, pageSize, total } }

}