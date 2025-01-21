import Prisma from "@/infra/db/prisma"
import { NotFoundError } from "@/presentations/errors/notFoundException"

export const getSchedulerById = async (id: number) => {

    const data = await Prisma.commissionScheduler.findUnique({
        where: {
            id
        }

    })

    if (!data) throw new NotFoundError("Category not found")

    return data

}