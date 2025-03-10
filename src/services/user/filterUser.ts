import Prisma from "@/infra/db/prisma"
import { NotFoundError } from "@/presentations/errors/notFoundException"

export const filterUser = async (filter, pagination: any, orderBy: any = { created_at: "desc" }) => {
    const { page = 1, pageSize = 10 } = pagination

    let query: any[] = []

    let queryOr: any[] = []
    if (filter.name) queryOr.push({ name: { contains: filter.name } })
    if (filter.email) queryOr.push({ email: { contains: filter.email } })
    if (filter.login) queryOr.push({ login: { contains: filter.login } })

    if (queryOr.length > 0) {
        query.push({ OR: queryOr })
    }
    const data = await Prisma.user.findMany({
        take: pageSize,
        skip: pageSize * (page - 1),
        where: {
            AND: query,
        },
        select: {
            id: true,
            name: true,
            email: true,
            login: true,
            country_code: true,
            country_name: true,
            profile: true,
            is_active: true,
            created_at: true,
            Balance: {
                select: {
                    amount: true
                },
                where: {
                    wallet: "MAIN"
                }
            },
            sponsor: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                    login: true
                }
            }
        }
    })

    if (!data) throw new NotFoundError("User not found")

    const total = await Prisma.user.count({
        where: {
            AND: query
        },
    })

    return { data: data.map((m) => {

        return {
            ...m,
            balance: m.Balance?.[0]?.amount || 0
        }
    }), metadata: { page, pageSize, total } }

}