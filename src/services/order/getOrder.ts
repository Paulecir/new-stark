import PrismaLocal from "@/infra/db/prisma"
import { NotFoundError } from "@/presentations/errors/notFoundException"
import { IFilter } from "@/presentations/interface/IFilter"

export const getOrder = async (
    {
        filter,
        user
    }: IFilter
    , Prisma = PrismaLocal
) => {
    const data = await Prisma.order.findFirst({
        where: {
            user_id: user.id,
            OR: [
                { id: parseInt(filter.orderId) || 0 },
                { order_id: filter.orderId }
            ]
        },
        include: {
            user: {
                select: {
                    id: true,
                    name: true,
                    email: true
                }
            },
            OrderItem: {
                include: {
                    product: {
                        select: {
                            id: true,
                            name: true
                        }
                    }
                }
            }
        }
    })
    if (!data) throw new NotFoundError("Order not found")

    return { data }

}