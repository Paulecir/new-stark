import Prisma from "@/infra/db/prisma";
import moment from "moment";


export const dashboardAdminStats = async ({ user }: any) => {

    const userInactive = await Prisma.user.count({
        where: {
            is_active: false
        },
    });

    const userTotal = await Prisma.user.count({
        where: {
            // is_active: true
        },
    });


    const ordersTotal = await Prisma.order.aggregate({
        _sum: {
            total: true
        },
        where: {
             status: 'done'
        },
    })

    const ordersTodayTotal = await Prisma.order.aggregate({
        _sum: {
            total: true
        },
        where: {
             status: 'done',
             created_at: {
                gt: moment().startOf("day").toDate(),
                lt: moment().endOf("day").toDate(),
            }
        },
    })


    const ordersExtract: any = await Prisma.$queryRaw` SELECT
        EXTRACT(YEAR FROM created_at) AS ano,
        EXTRACT(MONTH FROM created_at) AS mes,
        COUNT(*) AS total
    FROM
        \`order\`
    GROUP BY
        ano, mes
    ORDER BY
        ano, mes;`

    console.log("O", ordersExtract)

    const orders = []
    const date = moment().startOf("year")
    for (let i = 1; i <= 12; i++) {
        const fnd = ordersExtract.find(f => f.ano.toString() === date.format("YYYY") && f.mes.toString() === date.format("M"))

        if (!fnd) {
            orders.push({
                month: date.format("MM-YYYY"),
                value: 0
            })
        } else {
            orders.push({
                month: date.format("MM-YYYY"),
                value: fnd.total
            })
        }

        date.add("1", "month")
    }



    return { userTotal, userInactive, useActive: userTotal - userInactive, ordersTotal: ordersTotal._sum.total, ordersTodayTotal: ordersTodayTotal._sum.total, orders }

}