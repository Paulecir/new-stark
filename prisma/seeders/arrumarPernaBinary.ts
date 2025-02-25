import Prisma from "../../src/infra/db/prisma";
import moment from 'moment'

async function arrumar() {

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
            }
        },
        include: {
            order: true,
            product: true
        }
    })

    await Prisma.balance.deleteMany({
        where: {
            wallet: {
                in: ["BINARY_LEFT_POINT_NEW", "BINARY_RIGHT_POINT_NEW", "BINARY_LEFT_POINT_TOTAL_NEW", "BINARY_RIGHT_POINT_TOTAL_NEW"]
            }
        }
    })
    let i = orders.length
    let date: any = null
    for (const item of orders) {
        console.log("I", item.id)
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
                    await Prisma.balance.upsert({
                        where: {
                            user_id_wallet: {
                                user_id: binary.user_id,
                                wallet: "BINARY_RIGHT_POINT_NEW"
                            }
                        },
                        create: {
                            user_id: binary.user_id,
                            wallet: "BINARY_RIGHT_POINT_NEW",
                            amount: 0
                        },
                        update: {
                            amount: {
                                decrement: value
                            }
                        }
                    })
    
                    await Prisma.balance.upsert({
                        where: {
                            user_id_wallet: {
                                user_id: binary.user_id,
                                wallet: "BINARY_LEFT_POINT_NEW"
                            }
                        },
                        create: {
                            user_id: binary.user_id,
                            wallet: "BINARY_LEFT_POINT_NEW",
                            amount: 0
                        },
                        update: {
                            amount: {
                                decrement: value
                            }
                        }
                    })
                }
    
            }

            date = current
        }

        const point = (item.product?.category_id === 4 ? item.amount.toNumber() : item.amount.toNumber() / 2) * item.quantity

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
            console.log("DO 1")
            if (!binary.parent) break;
            console.log("DO Right", binary?.parent?.right_id, '===', binary.id)
            console.log("DO Left", binary?.parent?.left_id, '===', binary.id)
            // Aqui é de Direita
            if (binary?.parent?.right_id === binary.id) {
                await Prisma.balance.upsert({
                    where: {
                        user_id_wallet: {
                            user_id: binary.parent.user_id,
                            wallet: "BINARY_RIGHT_POINT_NEW"
                        }
                    },
                    create: {
                        user_id: binary.parent.user_id,
                        wallet: "BINARY_RIGHT_POINT_NEW",
                        amount: point
                    },
                    update: {
                        amount: {
                            increment: point
                        }
                    }
                })

                await Prisma.balance.upsert({
                    where: {
                        user_id_wallet: {
                            user_id: binary.parent.user_id,
                            wallet: "BINARY_RIGHT_POINT_TOTAL_NEW"
                        }
                    },
                    create: {
                        user_id: binary.parent.user_id,
                        wallet: "BINARY_RIGHT_POINT_TOTAL_NEW",
                        amount: point
                    },
                    update: {
                        amount: {
                            increment: point
                        }
                    }
                })
            }

            // Aqui é de esquerda
            if (binary?.parent?.left_id === binary.id) {
                await Prisma.balance.upsert({
                    where: {
                        user_id_wallet: {
                            user_id: binary.parent.user_id,
                            wallet: "BINARY_LEFT_POINT_NEW"
                        }
                    },
                    create: {
                        user_id: binary.parent.user_id,
                        wallet: "BINARY_LEFT_POINT_NEW",
                        amount: point
                    },
                    update: {
                        amount: {
                            increment: point
                        }
                    }
                })

                await Prisma.balance.upsert({
                    where: {
                        user_id_wallet: {
                            user_id: binary.parent.user_id,
                            wallet: "BINARY_LEFT_POINT_TOTAL_NEW"
                        }
                    },
                    create: {
                        user_id: binary.parent.user_id,
                        wallet: "BINARY_LEFT_POINT_TOTAL_NEW",
                        amount: point
                    },
                    update: {
                        amount: {
                            increment: point
                        }
                    }
                })
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
        console.log("B")
    }


}


arrumar()