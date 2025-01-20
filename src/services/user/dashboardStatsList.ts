import Prisma from "@/infra/db/prisma"
import { NotFoundError } from "@/presentations/errors/notFoundException"

export const dashboardStatsList = async ({
    filter = {}
    , pagination
    , orderBy = { created_at: "desc" }
    , user }: any
) => {
    const { page = 1, pageSize = 10 } = pagination

    const extraFilter = []
    switch (filter.status) {
        case 'noOrders': {
            extraFilter.push({
                Order: { none: {} }
            })
            break;
        }
        case 'noPositions': {
            extraFilter.push({
                StrategyBinary: { none: {}}
            })
        }
        case 'noQualify': {
            extraFilter.push({
                StrategyBinary: {
                    some: {
                        OR: [
                            {
                                qualify: false,
                            },
                            {
                                left_qualify: false,
                            },
                            {
                                right_qualify: false,
                            },
                        ]
                    }
                },
            })
            break;
        }
    }

    const data = await Prisma.user.findMany({
        take: pageSize,
        skip: pageSize * (page - 1),
        select: {
            id: true,
            name: true,
            email: true,
            login: true,
            phone: true
        },
        where: {
            AND: [
                { ancestry: { contains: `#${user.id}#` } },
                ...extraFilter,

            ]
        },

    });

    if (!data) throw new NotFoundError("User not found")

    const total = await Prisma.user.count({
        where: {
            AND: [
                { ancestry: { contains: `#${user.id}#` } },
                ...extraFilter,

            ]
        },
    })

    return { data, metadata: { page, pageSize, total } }


}