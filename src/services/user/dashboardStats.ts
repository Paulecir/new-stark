import Prisma from "@/infra/db/prisma";


export const dashboardStats = async ({ user }: any) => {

    const noOrders = await Prisma.user.count({
        where: {
            ancestry: { contains: `#${user.id}#` },
            Order: { none: {} }
        },

    });

    const noPositions= await Prisma.user.count({
        where: {
            ancestry: { contains: `#${user.id}#` },
            StrategyBinary: { none: {} }
        },

    });

    const noQualify = await Prisma.user.count({
        where: {
            ancestry: { contains: `#${user.id}#` },
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
            }
        },

    });


    return { 
        noPositions, 
        noQualify, 
        noOrders
     }

}