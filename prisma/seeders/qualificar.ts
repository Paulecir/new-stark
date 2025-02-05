import Prisma from "../../src/infra/db/prisma";

async function arrumar() {

    const strategyBinary = await Prisma.strategyBinary.findMany({
        include: {
            left: true,
            right: true
        },
    })

    console.log("CONSULTOU 1")

    for (const bin of strategyBinary) {
        console.log("BIN", bin.id)
        const prd = await Prisma.orderItem.findFirst({
            where: {
                product: {
                    category_id: 4
                },
                order: {
                    user_id: bin?.user_id,
                       status: 'done'
                }
            }
        })

        const prdLeft = await Prisma.orderItem.findFirst({
            where: {
                product: {
                    category_id: 4
                },
                order: {
                       user_id: bin.left?.user_id,
                       status: 'done'
                }
            }
        })

        const prdRight = await Prisma.orderItem.findFirst({
            where: {
                product: {
                    category_id: 4
                },
                order: {
                    user_id: bin.right?.user_id,
                       status: 'done'
                }
            }
        })


        await Prisma.strategyBinary.update({
            where: {
                id: bin.id
            },
            data: {
                qualify: prd ? true : false,
                left_qualify: prdLeft ? true : false,
                right_qualify: prdRight ? true : false,
            }
        });

    }
}


arrumar();