import Prisma from "@/infra/db/prisma"
import { NotFoundError } from "@/presentations/errors/notFoundException"

export const filterSessions = async (filter: any[] = [], pagination: any, orderBy: any = { created_at: "desc" }, user: any) => {
    const { page = 1, pageSize = 10 } = pagination

    const data = await Prisma.userSession.findMany({
        take: pageSize,
        skip: pageSize * (page - 1),
        where: {
            AND: {
                ...filter,
                user_id: user.id
            }
        },
        omit: {
            "access_token": true
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

    if (!data) throw new NotFoundError("User not found")

    const total = await Prisma.userSession.count({
        where: {
            AND: {
                ...filter,
                user_id: user.id
            }
        },
    })

    return { data, metadata: { page, pageSize, total } }

}