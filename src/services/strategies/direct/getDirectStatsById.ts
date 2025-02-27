import PrismaLocal from "@/infra/db/prisma";

export const getDirectStatsById = async ({ id, level = 2, user }: any, Prisma = PrismaLocal) => {

    const users = await Prisma.user.findFirst({
        where: {
            id
        },
    })


    const direct = await Prisma.user.count({
        where: {
            sponsor_id: id
        }
    })

    const directActive = await Prisma.user.count({
        where: {
            sponsor_id: id,
            Order: {
                some: {
                    status: "done"
                }
            }
        }
    })

    const total = await Prisma.user.count({
        where: {
            ancestry: {
                contains: `#${id}#`
            }
        }
    })

    const totalActive = await Prisma.user.count({
        where: {
            ancestry: {
                contains: `#${id}#`
            },
            Order: {
                some: {
                    status: "done"
                }
            }
        }
    })

    return {
        direct,
        directActive,
        total,
        totalActive,
        puntos: 0
    };
}