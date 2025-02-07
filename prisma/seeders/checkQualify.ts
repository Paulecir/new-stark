import Prisma from "../../src/infra/db/prisma";

async function arrumar() {

    const usersQualify = await Prisma.user.findMany({
        where: {
            Order: {
                some: {
                    status: "done",
                    OrderItem: {
                        some: {
                            product: {
                                category_id: 4
                            }
                        }
                    }
                }
            }
        },
    })


    let i = usersQualify.length

    for (const qualify of usersQualify) {
        console.log("restante: ", i)
        i--
        const binary = await Prisma.strategyBinary.findFirst({
            where: {
                user_id: qualify.id
            }
        })
        if (!binary) continue;

        const direction = binary.ref;

        if (direction === 'L') {
            await Prisma.strategyBinary.updateMany({
                where: {
                    user_id: qualify.sponsor_id
                },
                data: {
                    left_qualify: true
                }
            })
        }

        if (direction === 'R') {
            await Prisma.strategyBinary.updateMany({
                where: {
                    user_id: qualify.sponsor_id
                },
                data: {
                    right_qualify: true
                }
            })
        }

        await Prisma.strategyBinary.updateMany({
            where: {
                user_id: qualify.id
            },
            data: {
                qualify: true
            }
        })



    }


}


arrumar();