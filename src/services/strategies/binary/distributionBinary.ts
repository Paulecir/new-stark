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

    const currentUser = await Prisma.user.findFirst({
        where: {
            id: order.user_id
        }
    })

    await addBalance({
        name: "Binary add point"
        , wallet: "BINARY_CEILING_USER"
        , user_id: currentUser.id
        , amount: point
        , ref_type: 'strategyBinary'
        , ref_id: binary.id
        , extra_info: {
            from: currentUser.id,
            fromName: currentUser.name,
            fromLogin: currentUser.login,
            productId: item.product.id,
            productName: item.product.name,
            productPrice: item.product.price,
        }
    }, Prisma)

    do {

        if (binary.ref === "R") {
            await addBalance({
                name: "Binary add point"
                , wallet: "BINARY_RIGHT_POINT"
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
            // await Prisma.strategyBinary.update(
            //     {
            //         where: {
            //             id: binary.parent.id
            //         },
            //         data: {
            //             right_point: {
            //                 increment: point
            //             }
            //         }
            //     })
        }

        if (binary.ref === "L") {
            await addBalance({
                name: "Binary add point"
                , wallet: "BINARY_LEFT_POINT"
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

            // await Prisma.strategyBinary.update(
            //     {
            //         where: {
            //             id: binary.parent.id
            //         },
            //         data: {
            //             left_point: {
            //                 increment: point
            //             }
            //         }
            //     })
        }

        if (!binary.parent) break;

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