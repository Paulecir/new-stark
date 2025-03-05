import PrismaLocal from "@/infra/db/prisma"
import { addBalance } from "../balance/addBalance";
import moment from "moment";
import { E } from "@faker-js/faker/dist/airline-D6ksJFwG";

export const payCommission = async () => {
    const categories = await PrismaLocal.category.findMany({
        where: {
            commission_pay_config: {
                path: "$.day",
                equals: "05"
            }
        }
    })

    for (const category of categories) {
        const minor = await PrismaLocal.commission.findFirst({
            where: {
                status: "PENDING",
                scheduler: {
                    category_id: category.id
                }
            },
            orderBy: {
                date: "asc"
            }
        })

        if (!minor) continue;

        let startDate = moment(moment(minor?.date).format(`YYYY-MM-${category.commission_pay_config.day}T00:00:00`))

        if (startDate.isAfter(moment(minor.date))) {
            startDate = startDate.subtract(1, "month")
        }

        const startDateFormated = startDate.format("YYYY-MM-DDT00:00:00")
        const endDateFormated = startDate.add(1, "month").format("YYYY-MM-DDT00:00:00")

        console.log("?", `
            SELECT 
                c.user_id,
                cs.category_id,
                sum(c.total) as amount
            FROM 
                commission as c
            INNER JOIN commission_scheduler cs ON cs.id = c.scheduler_id
            WHERE
                c.status = 'PENDING' and cs.date < "${endDateFormated}" and cs.date > "${startDateFormated}" and cs.category_id = ${category.id}
            GROUP BY user_id
        `)

        await PrismaLocal.$transaction(async (Prisma) => {

            const commissions: any[] = await PrismaLocal.$queryRaw`
            SELECT 
                c.user_id,
                cs.category_id,
                sum(c.total) as amount
            FROM 
                commission as c
            INNER JOIN commission_scheduler cs ON cs.id = c.scheduler_id
            WHERE
                c.status = 'PENDING' and cs.date < ${endDateFormated} and cs.date > ${startDateFormated} and cs.category_id = ${category.id}
            GROUP BY c.user_id
        `;


            let ct = commissions.length

            for (const commission of commissions) {
                console.log("C", ct--)
                const order = await Prisma.commissionOrder.create({
                    data: {
                        obs: "",
                        total: commission.amount,
                        user_id: commission.user_id,
                        date_ref: moment(startDateFormated).format("YYYY-MM-DD"),
                        category_id: commission.category_id
                    }
                })

                console.log("?", `UPDATE commission 
                    INNER JOIN commission_scheduler ON commission.scheduler_id = commission_scheduler.id
                    SET 
                        commission.commission_order_id = ${order.id}, 
                        commission.status = "ASSOCIATED" 
                    
                    WHERE 
                        user_id = ${commission.user_id} 
                        AND commission.status = 'PENDING' 
                        AND commission_scheduler.date < "${endDateFormated}"
                        AND commission_scheduler.date > "${startDateFormated}"
                        AND commission_scheduler.category_id = ${category.id}`)
                        await Prisma.$executeRaw`
                    UPDATE commission 
                    INNER JOIN commission_scheduler ON commission.scheduler_id = commission_scheduler.id
                    SET 
                        commission.commission_order_id = ${order.id}, 
                        commission.status = "ASSOCIATED" 
                    WHERE 
                        user_id = ${commission.user_id} 
                        AND commission.status = 'PENDING' 
                        AND commission_scheduler.date < ${endDateFormated}
                        AND commission_scheduler.date > ${startDateFormated}
                        AND commission_scheduler.category_id = ${category.id}
                `;

                console.log(commission.scheduler_id);
            }
        }, {
            maxWait: 1000000,
            timeout: 1000000
        })

    }

    // await PrismaLocal.$transaction(async (Prisma) => {

    //     const date = moment().startOf("day")
    //     const dateStart = moment().startOf("day").subtract(1, "month")

    //     const commissions: any[] = await PrismaLocal.$queryRaw`
    //          SELECT 
    //             c.user_id,
    //             cs.category_id,
    //             sum(c.total) as amount
    //         FROM 
    //             commission as c
    //         INNER JOIN commission_scheduler cs ON cs.id = c.scheduler_id
    //         WHERE
    //             c.status = 'PENDING' and date < "${date}" and date > "${dateStart}"
    //         GROUP BY user_id, cs.category_id
    //     `;

    //     let ct = commissions.length

    //     for (const commission of commissions) {
    //         console.log("C", ct--)
    //         const order = await Prisma.commissionOrder.create({
    //             data: {
    //                 obs: "",
    //                 total: commission.amount,
    //                 user_id: commission.user_id,
    //                 date_ref: moment().format(),
    //                 category_id: commission.category_id
    //             }
    //         })

    //         await Prisma.commission.updateMany({
    //             where: {
    //                 user_id: commission.user_id,
    //                 scheduler_id: commission.scheduler_id,
    //                 status: "PENDING"
    //             },
    //             data: {
    //                 commission_order_id: order.id,
    //                 status: "ASSOCIATED"
    //             }
    //         })
    //     }

    //     throw new Error("ERRO")
    // }, {
    //     maxWait: 1000000,
    //     timeout: 1000000
    // })


}