import PrismaLocal from "@/infra/db/prisma"
import { NotFoundError } from "@/presentations/errors/notFoundException"
import { IFilter } from "@/presentations/interface/IFilter"

export const dashboardResume = async (
    {
        filter: { direction },
        user
    }: IFilter
    , Prisma = PrismaLocal
) => {

    const binary = await Prisma.strategyBinary.findFirst({
        where: {
            user_id: user.id,
        }
    })

    if (!binary) {
        throw new NotFoundError("Binary not found")
    }

    const binaryPay = await Prisma.strategyBinaryPay.aggregate({
        where: {
            user_id: user.id,
            status: { in: ["PAYED", "PENDING", "NOTQUALIFY"] },
            direction: direction.toUpperCase() === 'LEFT' ? "LEFT" : direction.toUpperCase() === "RIGHT" ? "RIGHT" : { not: "NONE" }
        },
        _sum: {
            points: true
        }
    })


    const balance = await Prisma.balance.findMany({
        where: {
            user_id: user.id,
            wallet: direction.toUpperCase() === "LEFT" ? "BINARY_LEFT_POINT_NEW" : direction.toUpperCase() === "RIGHT" ? "BINARY_RIGHT_POINT_NEW" : { in: ["BINARY_RIGHT_POINT_NEW", "BINARY_LEFT_POINT_NEW"] }
        }
    })


    const balanceTotal = await Prisma.balance.findMany({
        where: {
            user_id: user.id,
            wallet: direction.toUpperCase() === "LEFT" ? "BINARY_LEFT_POINT_TOTAL_NEW" : direction.toUpperCase() === "RIGHT" ? "BINARY_RIGHT_POINT_TOTAL_NEW" : { in: ["BINARY_RIGHT_POINT_TOTAL_NEW", "BINARY_LEFT_POINT_TOTAL_NEW"] }
        }
    })

    let points = balance.reduce((acc: any, curr) => acc + curr.amount.toNumber(), 0)

    let totalPoints = balanceTotal.reduce((acc: any, curr) => acc + curr.amount.toNumber(), 0)

    const nodes = await Prisma.strategyBinary.count({
        where: {
            hier: {
                startsWith: `${binary.hier}${direction.toUpperCase() === "LEFT" ? 'L' : 'R'}`
            }
        }
    })

    let stats = {
        nodes,
        points,
        totalPoints: totalPoints,
        strategy: binary.strategy
    }

    return stats

}