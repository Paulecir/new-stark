import Prisma from "@/infra/db/prisma"
import { NotFoundError } from "@/presentations/errors/notFoundException"

export const filterProduct = async (filter: any[] = [], pagination: any, orderBy: any = { created_at: "desc" }) => {
    const { page = 1, pageSize = 10 } = pagination
    filter.push({ hidden: false })
    const data = await Prisma.product.findMany({
        take: pageSize,
        skip: pageSize * (page - 1),
        where: {
            AND: filter
        },
        include: {
            category: {
                select: {
                    id: true,
                    name: true
                }
            }
        }
    })

    if (!data) throw new NotFoundError("Product not found")

    const total = await Prisma.product.count({
        where: {
            AND: filter
        },
    })

    return { data, metadata: { page, pageSize, total } }

}