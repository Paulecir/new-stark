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
            direction: direction === 'left' ? "LEFT" : direction === "right" ? "RIGHT" : { not: "NONE" }


        },
        _sum: {
            points: true
        }
    })


    const balance = await Prisma.balance.findMany({
        where: {
            user_id: user.id,
            wallet: direction === "left" ? "BINARY_LEFT_POINT" : direction === "right" ? "BINARY_RIGHT_POINT" : { in: ["BINARY_RIGHT_POINT", "BINARY_LEFT_POINT"] }
        }
    })


    const balanceTotal = await Prisma.balance.findMany({
        where: {
            user_id: user.id,
            wallet: direction === "left" ? "BINARY_LEFT_POINT_PAY" : direction === "right" ? "BINARY_RIGHT_POINT_PAY" : { in: ["BINARY_RIGHT_POINT_PAY", "BINARY_LEFT_POINT_PAY"] }
        }
    })

    let points = balance.reduce((acc: any, curr) => acc + curr.amount.toNumber(), 0)

    let totalPoints = balanceTotal.reduce((acc: any, curr) => acc + curr.amount.toNumber(), 0)

    const nodes = await Prisma.strategyBinary.count({
        where: {
            hier: {
                startsWith: `${binary.hier}${direction === "left" ? 'L' : 'R'}`
            }
        }
    })

    let stats = {
        nodes,
        points,
        totalPoints,
        strategy: binary.strategy
    }

    return stats

}