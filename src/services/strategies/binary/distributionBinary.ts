import PrismaLocal from "@/infra/db/prisma";
import { addBalance } from "@/services/balance/addBalance";

export const distributionBinary = async ({ order, item }: any, Prisma = PrismaLocal) => {

    const category = await Prisma.category.findFirst({
        where: {
            id: item.product.category_id,
        },
    })

    const point = item.amount.toNumber() * (category.binary_bonus_point_percent.toNumber() / 100)

    let binary = await Prisma.strategyBinary.findFirst({
        where: {
            user_id: order.user_id
        },
        include: {

            user: true,
            parent: {
                include: {
                    user: true
                }
            }
        }
    })

    if (!binary) return [];

    const currentUser = await Prisma.user.findFirst({
        where: {
            id: order.user_id
        }
    })

    do {
        if (!binary.parent) break;
        if (binary?.parent?.right_id === binary.id) {
            await addBalance({
                name: "Binary add point"
                , wallet: "BINARY_RIGHT_POINT_NEW"
                , user_id: binary.parent.user_id
                , amount: point
                , ref_type: 'strategyBinary'
                , ref_id: binary.parent.id
                , extra_info: {
                    from: currentUser.id,
                    fromName: currentUser.name,
                    fromLogin: currentUser.login,
                    to: binary.parent.user.id,
                    toName: binary.parent.user.name,
                    toLogin: binary.parent.user.login,
                    productId: item.product.id,
                    productName: item.product.name,
                    productPrice: item.product.price,
                }
            }, Prisma)
            await addBalance({
                name: "Binary add point"
                , wallet: "BINARY_LEFT_POINT_TOTAL_NEW"
                , user_id: binary.parent.user_id
                , amount: point
                , ref_type: 'strategyBinary'
                , ref_id: binary.parent.id
                , extra_info: {
                    from: currentUser.id,
                    fromName: currentUser.name,
                    fromLogin: currentUser.login,
                    to: binary.parent.user.id,
                    toName: binary.parent.user.name,
                    toLogin: binary.parent.user.login,
                    productId: item.product.id,
                    productName: item.product.name,
                    productPrice: item.product.price,
                }
            }, Prisma)
        }

        if (binary?.parent?.left_id === binary.id) {
            await addBalance({
                name: "Binary add point"
                , wallet: "BINARY_LEFT_POINT_NEW"
                , user_id: binary.parent.user_id
                , amount: point
                , ref_type: 'strategyBinary'
                , ref_id: binary.parent.id
                , extra_info: {
                    from: currentUser.id,
                    fromName: currentUser.name,
                    fromLogin: currentUser.login,
                    to: binary.parent.user.id,
                    toName: binary.parent.user.name,
                    toLogin: binary.parent.user.login,
                    productId: item.product.id,
                    productName: item.product.name,
                    productPrice: item.product.price,
                }
            }, Prisma)
            await addBalance({
                name: "Binary add point"
                , wallet: "BINARY_LEFT_POINT_TOTAL_NEW"
                , user_id: binary.parent.user_id
                , amount: point
                , ref_type: 'strategyBinary'
                , ref_id: binary.parent.id
                , extra_info: {
                    from: currentUser.id,
                    fromName: currentUser.name,
                    fromLogin: currentUser.login,
                    to: binary.parent.user.id,
                    toName: binary.parent.user.name,
                    toLogin: binary.parent.user.login,
                    productId: item.product.id,
                    productName: item.product.name,
                    productPrice: item.product.price,
                }
            }, Prisma)

        }

        binary = await Prisma.strategyBinary.findFirst({
            where: {
                id: binary.parent.id
            },
            include: {
                user: true,
                parent: {
                    include: {
                        user: true
                    }
                }
            }
        })


    } while (binary)

    return [];
}