import Prisma from "@/infra/db/prisma"
import { NotFoundError } from "@/presentations/errors/notFoundException"

export const filterWallet = async (filter: any[] = [], pagination: any, orderBy: any = { created_at: "desc" }) => {
    const { page = 1, pageSize = 10 } = pagination

    const data = await Prisma.wallet.findMany({
        take: pageSize,
        skip: pageSize * (page - 1),
        where: {
            AND: filter
        },
    })

    if (!data) throw new NotFoundError("Wallet not found")

    const total = await Prisma.wallet.count({
        where: {
            AND: filter
        },
    })

    return { data, metadata: { page, pageSize, total } }

}