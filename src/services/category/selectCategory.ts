import Prisma from "@/infra/db/prisma"
import { NotFoundError } from "@/presentations/errors/notFoundException"

export const selectCategory = async (filter: any[] = [], orderBy: any = { created_at: "desc" }) => {

    const data = await Prisma.category.findMany({
        where: {
            AND: filter
        },
    })

    if (!data) throw new NotFoundError("Category not found")

    const total = await Prisma.category.count({
        where: {
            AND: filter
        },
    })

    return { data }

}