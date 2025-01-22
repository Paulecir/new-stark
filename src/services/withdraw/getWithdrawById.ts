import Prisma from "@/infra/db/prisma"
import { NotFoundError } from "@/presentations/errors/notFoundException"

export const getWithdrawById = async (id: number) => {

    const data = await Prisma.withdraw.findUnique({
        where: {
            id: id
        }
    })

    if (!data) throw new NotFoundError("Withdraw not found")

    return data

}