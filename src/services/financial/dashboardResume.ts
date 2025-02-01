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

    let points = balance.reduce((acc: any, curr) => acc + curr.amount.toNumber(), 0)

    let stats = {
        nodes: direction === "left" ? binary.left_count : direction === "right" ? binary.right_count : binary.left_count + binary.right_count,
        points,
        totalPoints: binaryPay._sum.points || 0,
        strategy: binary.strategy
    }

    return stats

}