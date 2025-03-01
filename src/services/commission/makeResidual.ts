import PrismaLocal from "@/infra/db/prisma"
import { addBalance } from "../balance/addBalance"

export const makeResidual = async () => {

    await new Promise((resolve) => { setTimeout(resolve, 3000) })

    const categories = await PrismaLocal.category.findMany({
        where: {
            residual_bonus: true
        },
        include: {
            CategoryItem: true
        }
    })


    for (const category of categories) {
        try {
            await PrismaLocal.$transaction(async (Prisma) => {
                const commissions: any = await PrismaLocal.$queryRaw`SELECT
                    co.id,
                    co.category_id,
                    co.user_id,
                    co.total,
                    co.total * 0.001 residual,
                    sum(oi.amount * oi.quantity) as amount
                FROM
                    commission_order co
                    INNER JOIN \`order\` o ON o.user_id = co.user_id
                    INNER JOIN order_item oi ON oi.order_id = o.id
                WHERE
                    co.date_ref = "2025-02-27"
                    and co.status = "PAYED"
                    and co.category_id = 1
                    and o.status = "DONE"
                GROUP BY
                    co.id, co.user_id`

                for (const commission of commissions) {
                    try {


                        let currentUser = await Prisma.user.findUnique({
                            where: {
                                id: commission.user_id
                            }
                        })

                        let current = await Prisma.user.findUnique({
                            where: {
                                id: commission.user_id
                            }
                        })

                        const categoryItem = await Prisma.categoryItem.findFirst({
                            where: {
                                category_id: category.id,
                                type: "RESIDUAL",
                                max_value: { lt: commission.amount }
                            },
                            orderBy: {
                                max_value: 'asc'
                            },
                            include: {
                                category: true
                            }
                        })

                        for (let i = 0; i < category.residual_bonus_levels; i++) {

                            if (!current.sponsor_id) break;

                            current = await Prisma.user.findFirst({
                                where: {
                                    id: current.sponsor_id
                                }
                            })

                            if (!current) break


                            if (categoryItem.level_values[i] > 0) {
                                console.log({
                                    name: `${categoryItem.category.name} Residual - Consultor: ${currentUser.name} [${i + 1}º Nível]`
                                    , wallet: "MAIN"
                                    , user_id: current.id
                                    , amount: commission.residual
                                    , ref_type: 'orderItem'
                                    , ref_id: commission.id
                                    , extra_info: {
                                        from: currentUser.id,
                                        fromName: currentUser.name,
                                        fromLogin: currentUser.login,
                                        to: current?.id,
                                        toName: current?.name,
                                        toLogin: current?.login,
                                        commission
                                    }
                                })
                                await addBalance({
                                    name: `${categoryItem.category.name} Residual - Consultor: ${currentUser.name} [${i + 1}º Nível]`
                                    , wallet: "MAIN"
                                    , user_id: current.id
                                    , amount: commission.residual
                                    , ref_type: 'orderItem'
                                    , ref_id: commission.id
                                    , extra_info: {
                                        from: currentUser.id,
                                        fromName: currentUser.name,
                                        fromLogin: currentUser.login,
                                        to: current?.id,
                                        toName: current?.name,
                                        toLogin: current?.login,
                                        commission
                                    }
                                }, Prisma)
                            }


                        }

                    } catch (error) {
                        console.error(error)
                    }
                }
            },
                {
                    timeout: 1000000,
                    maxWait: 1000000
                })
        } catch (error) {
            console.error(error)
        }
    }
}