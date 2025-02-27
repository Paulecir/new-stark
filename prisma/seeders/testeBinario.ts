import Prisma from "../../src/infra/db/prisma";
import { distributionBinary } from "../../src/services/strategies/binary/distributionBinary"

async function arrumar() {

    await new Promise(resolve => setTimeout(resolve, 3000))

    await Prisma.$transaction(async (Prisma) => {
        const order = await Prisma.order.findFirst({
            where: {
                id: 16601
            },
            include: {
                OrderItem: {
                    include: {
                        product: {
                            include: {
                                category: true
                            }
                        }
                    }
                }
            }
        })


        console.log("O", order)

        for (const item of order.OrderItem) {

            // if (item.product.category.direct_bonus) distributionDirect({ order, item }, Prisma)

            // if (item.product.category.unilevel_bonus) await distributionUnilevel({ order, item }, Prisma)

            // if (item.product.category.binary_bonus_position) try { await addBinaryStrategy({ userId: parseInt(order.user_id.toString()) }, Prisma) } catch { }

            if (item.product.category.binary_bonus) await distributionBinary({ order, item }, Prisma)

            // if (item.product.category.binary_bonus_qualify) await qualifyBinary({ order, item }, Prisma)
        }
    }, {
        timeout: 1000000,
        maxWait: 1000000
    })




}


arrumar()