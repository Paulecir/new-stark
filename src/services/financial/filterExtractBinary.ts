import PrismaLocal from "@/infra/db/prisma"
import { NotFoundError } from "@/presentations/errors/notFoundException"
import { IFilter } from "@/presentations/interface/IFilter"
import moment from "moment"

export const filterExtractBinary = async (
    {
        filter: { wallet },
        pagination = {},
        orderBy = { created_at: "desc" },
        user
    }: IFilter
    , Prisma = PrismaLocal
) => {
    const { page = 1, pageSize = 10 } = pagination

    const data = await Prisma.strategyBinaryPay.findMany({
        take: pageSize,
        skip: pageSize * (page - 1),
        select: {
            id: true,
            amount: true,
            direction: true,
            amountCeilingUser: true,
            amountTotalCeiling: true,
            amountPayed: true,
            created_at: true,
            points: true,
            qualify: true,
            user: {
                select: {
                    name: true
                }
            }

        },
        where: {
            AND: [
                // { user_id: user.id },
                { status: "PENDING" },
                { direction: { not: 'NONE' } }
            ]
        },
        orderBy
    })

    if (!data) throw new NotFoundError("Hitory not found")

    const total = await Prisma.strategyBinaryPay.count({
        where: {
            AND: [
                // { user_id: user.id },
                { status: "PENDING" },
                { direction: { not: 'NONE' } }
            ]
        },
    })

    return { data, metadata: { page, pageSize, total } }

}