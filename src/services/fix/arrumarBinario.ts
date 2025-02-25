import Prisma from '@/infra/db/prisma'
import moment from 'moment'
import { addBalance } from '../balance/addBalance'
import { decBalance } from '../balance/decBalance'

export async function arrumarBinario() {

    const orders = await Prisma.orderItem.findMany({
        orderBy: {
            created_at: 'asc'
        },
        where: {
            order: {
                status: 'done'
            },
            product: {
                category_id: {
                    in: [2, 3, 4]
                }
            },
            id: {
                gt: 17629
            }
        },
        include: {
            order: {
                include: {
                    user: true
                }
            },
            product: true
        }
    })

    // await Prisma.balance.deleteMany({
    //     where: {
    //         wallet: {
    //             in: ["BINARY_LEFT_POINT_NEW", "BINARY_RIGHT_POINT_NEW", "BINARY_LEFT_POINT_TOTAL_NEW", "BINARY_RIGHT_POINT_TOTAL_NEW"]
    //         }
    //     }
    // })
    
    let i = orders.length
    let date: any = null
    for (const item of orders) {
        console.log("I", item.id, i)
        const current = moment(item.created_at).startOf("day").add(2, "hours")
        if (date === null) {
            date = current
        }

        if (date.format() !== current.format()) {
            console.log(moment(date).format())

            const binaries = await Prisma.strategyBinary.findMany()

            for (const binary of binaries) {
                const vl = await Prisma.balance.findMany({
                    where: {
                        user_id: binary.user_id,
                        wallet: {
                            in: ["BINARY_RIGHT_POINT_NEW", "BINARY_LEFT_POINT_NEW"]
                        }
                    }
                })

                let value = (vl?.[0]?.amount.toNumber() || 0)

                if ((vl?.[0]?.amount.toNumber() || 0) > (vl?.[1]?.amount.toNumber() || 0)) {
                    value = vl?.[1]?.amount.toNumber() || 0
                }

                if (value > 0) {
                    await decBalance({
                        name: "Binary add point"
                        , wallet: "BINARY_RIGHT_POINT_NEW"
                        , user_id: binary.user_id
                        , amount: value
                        , ref_type: 'strategyBinary'
                        , ref_id: binary.id
                        , extra_info: {
                        }
                    }, Prisma)

                    await decBalance({
                        name: "Binary add point"
                        , wallet: "BINARY_LEFT_POINT_NEW"
                        , user_id: binary.user_id
                        , amount: value
                        , ref_id: binary.id
                        , extra_info: {
                        }
                    }, Prisma)
                   
                }

            }

            date = current
        }

        const point = (parseInt(item.product?.category_id.toString()) === 4 ? item.amount.toNumber() : item.amount.toNumber() / 2) * item.quantity

        let binary = await Prisma.strategyBinary.findFirst({
            where: {
                user_id: item.order.user_id
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
        if (!binary) continue;
        do {
            if (!binary.parent) break;
            // Aqui é de Direita
            if (binary?.parent?.right_id === binary.id) {
                await addBalance({
                    name: "Binary add point"
                    , wallet: "BINARY_RIGHT_POINT_NEW"
                    , user_id: binary.user_id
                    , amount: point
                    , ref_type: 'strategyBinary'
                    , ref_id: binary.id
                    , extra_info: {
                        from: item.order.user.id,
                        fromName: item.order.user.name,
                        fromLogin: item.order.user.login,
                        productId: item.product.id,
                        productName: item.product.name,
                        productPrice: item.product.price,
                    }
                }, Prisma)

                await addBalance({
                    name: "Binary add point"
                    , wallet: "BINARY_RIGHT_POINT_TOTAL_NEW"
                    , user_id: binary.user_id
                    , amount: point
                    , ref_type: 'strategyBinary'
                    , ref_id: binary.id
                    , extra_info: {
                        from: item.order.user.id,
                        fromName: item.order.user.name,
                        fromLogin: item.order.user.login,
                        productId: item.product.id,
                        productName: item.product.name,
                        productPrice: item.product.price,
                    }
                }, Prisma)
                
            }

            // Aqui é de esquerda
            if (binary?.parent?.left_id === binary.id) {
                await addBalance({
                    name: "Binary add point"
                    , wallet: "BINARY_LEFT_POINT_NEW"
                    , user_id: binary.user_id
                    , amount: point
                    , ref_type: 'strategyBinary'
                    , ref_id: binary.id
                    , extra_info: {
                        from: item.order.user.id,
                        fromName: item.order.user.name,
                        fromLogin: item.order.user.login,
                        productId: item.product.id,
                        productName: item.product.name,
                        productPrice: item.product.price,
                    }
                }, Prisma)

                await addBalance({
                    name: "Binary add point"
                    , wallet: "BINARY_LEFT_POINT_TOTAL_NEW"
                    , user_id: binary.user_id
                    , amount: point
                    , ref_type: 'strategyBinary'
                    , ref_id: binary.id
                    , extra_info: {
                        from: item.order.user.id,
                        fromName: item.order.user.name,
                        fromLogin: item.order.user.login,
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

        } while (binary);
    }


}

