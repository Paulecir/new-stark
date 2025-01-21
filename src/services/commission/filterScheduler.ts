import Prisma from "@/infra/db/prisma"
import { NotFoundError } from "@/presentations/errors/notFoundException"

export const filterScheduler = async ({ categoryId, type }: any, filter: any[] = [], pagination: any, orderBy: any = { date: "desc" }) => {
    const { page = 1, pageSize = 10 } = pagination

    const category = await Prisma.category.findFirst({
        where: {
            id: Number(categoryId)
        }
    })

    if (!category) throw new NotFoundError("Category not found")

    filter.push({ category_id: category.id })
    const data = await Prisma.commissionScheduler.findMany({
        take: pageSize,
        skip: pageSize * (page - 1),
        where: {
            AND: [
                { status: "SCHEDULER" },
                ...filter
            ]
        },
        include: {
            category: {
                select: {
                    id: true,
                    name: true
                }
            }
        },
        orderBy
    })

    if (!data) throw new NotFoundError("Category not found")

    const total = await Prisma.commissionScheduler.count({
        where: {
            AND: [
                { status: "SCHEDULER" },
                ...filter]
        },
    })

    return {
        data: {
            category,
            list: data
        }, category, metadata: { page, pageSize, total }
    }

}