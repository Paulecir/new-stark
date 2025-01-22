import Prisma from "@/infra/db/prisma"
import { NotFoundError } from "@/presentations/errors/notFoundException"

export const filterCommissionOrdersPending = async ({ categoryId, type }: any, filter: any[] = [], pagination: any, orderBy: any = { created_at: "desc" }) => {
    const { page = 1, pageSize = 10 } = pagination

    const data = await Prisma.commissionOrder.findMany({
        take: pageSize,
        skip: pageSize * (page - 1),
        where: {
            AND: [
                { status: "PENDING" },
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
            }
        },
        orderBy
    })

    if (!data) throw new NotFoundError("Category not found")

    const total = await Prisma.commissionOrder.count({
        where: {
            AND: [
                { status: "PENDING" },
                ...filter]
        },
    })

    return {
        data, metadata: { page, pageSize, total }
    }

}