import Prisma from "@/infra/db/prisma"
import { NotFoundError } from "@/presentations/errors/notFoundException"

export const filterUserSelect = async (filter, pagination: any, orderBy: any = { created_at: "desc" }) => {
    const { page = 1, pageSize = 10 } = pagination

    let query: any[] = []

    let queryOr: any[] = []
    queryOr.push({ name: { contains: filter.search } })
    queryOr.push({ email: { contains: filter.search } })
    queryOr.push({ login: { contains: filter.search } })

    if (queryOr.length > 0) {
        query.push({ OR: queryOr })
    }
    const data = await Prisma.user.findMany({
        take: 200,
        where: {
            AND: query,
        },
        select: {
            id: true,
            name: true,
            Balance: {
                select: {
                    amount: true
                },
                where: {
                    wallet: "MAIN"
                }
            }
        }
    })


    return { data: data.map((m) => {

        return {
            ...m,
            balance: m.Balance?.[0]?.amount || 0
        }
    }), metadata: { page, pageSize, total: 0 } }

}