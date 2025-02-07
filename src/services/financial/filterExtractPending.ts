import PrismaLocal from "@/infra/db/prisma"
import { NotFoundError } from "@/presentations/errors/notFoundException"
import { notAuthorized } from "@/presentations/helpers/httpResponse"
import { IFilter } from "@/presentations/interface/IFilter"
import moment from "moment"

export const filterExtractPending = async (
    {
        filter: { wallet },
        pagination = {},
        orderBy = { created_at: "desc" },
        user
    }: IFilter
    , admin = false
    , Prisma = PrismaLocal
) => {
    const { page = 1, pageSize = 10 } = pagination

    if (admin && user.profile !== "admin") throw notAuthorized({
        error_code: "NOT_AUTHORIZED"
    })

    let extraQuery = []

    if (!admin) {
        extraQuery = [{ user_id: user.id }]
    }

    const data = await Prisma.commission.findMany({
        take: pageSize,
        skip: pageSize * (page - 1),
        select: {
            id: true,
            amount: true,
            total: true,
            percent: true,
            created_at: true,
            user: {
                select: {
                    name: true
                }
            },
            scheduler: {
                select: {
                    date: true
                }
            },
            orderItem: {
                select: {
                    product: {
                        select :{
                            name:true,
                            category: {
                                select: {
                                    name: true
                                }
                            }
                        }
                    }
                }
            }
        },
        where: {
            AND: [
                ...extraQuery,
                { status: "PENDING" }
            ]
        },
        orderBy
    })

    if (!data) throw new NotFoundError("Hitory not found")

    const total = await Prisma.commission.count({
        where: {
            AND: [
                ...extraQuery,
                { status: "PENDING" },
            ]
        },
    })

    return { data: data.map(m => {
        return {...m, name: `Bonus ${m.orderItem.product.category.name} [ Plan: ${m.orderItem.product.name} ] [ ${m.percent}% ] [ ${moment(m.scheduler.date).format("YYYY-MM-DD")}]`}
    }), metadata: { page, pageSize, total } }

}