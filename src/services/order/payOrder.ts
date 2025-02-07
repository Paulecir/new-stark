import PrismaLocal from "@/infra/db/prisma"
import { approveOrder } from "./approveOrder"
import { decBalance } from "../balance/decBalance"
import axios from "axios"

export const payOrder = async (data: any, user: any, Prisma = PrismaLocal) => {

    if (!data.method) {
        throw new Error("METHOD_REQUIRED")
    }

    if (!data.order_id) {
        throw new Error("ORDER_ID_REQUIRED")
    }
    let order = await Prisma.order.findFirst({
        where: { order_id: data.order_id },
        include: {
            user: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                    login: true
                }
            }
        }
    })

    if (!order) {
        throw new Error("ORDER_NOT_FOUND")
    }


    switch (data.method) {
        case "BALANCE": {
            const balance = await Prisma.balance.findFirst({
                where: {
                    user_id: user.id,
                    wallet: "MAIN"
                }
            })

            if (!balance) {
                throw new Error("BALANCE_NOT_FOUND")
            }

            if (balance.amount.toNumber() < order.total.toNumber()) {
                throw new Error("BALANCE_NOT_ENOUGH")
            }

            const history = await decBalance({
                name: `Pagamento do pedido #${order.order_id} com saldo da conta [${order.user.name}]`
                , wallet: "MAIN"
                , user_id: user.id
                , amount: order.total.toNumber()
                , ref_type: 'order'
                , ref_id: order.id
                , extra_info: {
                    to: order.user?.id,
                    toName: order.user?.name,
                    toLogin: order.user?.login,
                    orderId: order.id
                }
            }, Prisma)

            await Prisma.order.update({
                where: {
                    id: order.id
                },
                data: {
                    payment_method: "BALANCE",
                    payment: {},
                    payment_result: history
                }
            })

            order = await approveOrder({ orderId: order.order_id }, Prisma)

            return order
        }
        case "CRIPTO": {
            const info = await axios.get(`https://api.plisio.net/api/v1/invoices/new?source_currency=USD&source_amount=${order.total}&order_number=${order.order_id}&currency=USDT_BSC&email=${order.user.email}&order_name=${order.user.name}&callback_url=${process.env.PLISIO_CALLBACK}&api_key=${process.env.PLISIO_KEY}&return_existing=true`)
                .then(res => {
                    return res.data?.data
                })
                .catch(err => {
                    return err.data
                })

            const orderUpdate = await Prisma.order.update({
                where: {
                    id: order.id
                },
                data: {
                    status: "pending",
                    payment_method: "PLISIO",
                    payment: info
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

            return orderUpdate;
        }

    }

    order = await Prisma.order.findFirst({
        where: { order_id: data.order_id },
        include: {
            OrderItem: {
                include: {
                    product: {
                        include: {
                            category: true
                        }
                    }
                }
            },
            user: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                    login: true
                }
            }
        }
    })
    return order
}