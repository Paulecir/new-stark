import Prisma from "@/infra/db/prisma"
import { NotFoundError } from "@/presentations/errors/notFoundException"

export const getUserById = async (id: number) => {

    const data = await Prisma.user.findUnique({
        where: {
            id: id
        }

    })

    if (!data) throw new NotFoundError("User not found")

    return data

}