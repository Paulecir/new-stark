import Prisma from "@/infra/db/prisma"
import { NotFoundError } from "@/presentations/errors/notFoundException"

export const getWalletById = async (id: number) => {

    const data = await Prisma.wallet.findUnique({
        where: {
            id: id
        }
    })

    if (!data) throw new NotFoundError("Wallet not found")

    return data

}