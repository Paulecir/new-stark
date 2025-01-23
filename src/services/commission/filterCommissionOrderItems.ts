import Prisma from "@/infra/db/prisma"
import { NotFoundError } from "@/presentations/errors/notFoundException"

export const filterCommissionOrderItems = async (filter: any[] = [], pagination: any, orderBy: any = { created_at: "desc" }) => {
    const { page = 1, pageSize = 10 } = pagination

    const data = await Prisma.commission.findMany({
        take: pageSize,
        skip: pageSize * (page - 1),
        where: {
            AND: [
                ...filter
            ]
        },
        include: {
            user: {
                select: {
                    id: true,
                    name: true,
                    login: true,
                    email: true
                }
            },
            orderItem: {
                select: {
                    product: {
                        select: {
                            id: true,
                            name: true
                        }
                    }
                }
            }
        },
        orderBy
    })

    if (!data) throw new NotFoundError("Category not found")

    const total = await Prisma.commission.count({
        where: {
            AND: [
                ...filter]
        },
    })

    return {
        data, metadata: { page, pageSize, total }
    }

}